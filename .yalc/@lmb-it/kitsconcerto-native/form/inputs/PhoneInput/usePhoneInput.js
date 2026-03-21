import { useMemo, useState, useEffect, useCallback } from 'react';
import { phone_masks } from '../../../third-parties/phone_masks.js';
import { countries } from '../../../third-parties/countries.js';

const dialCodeMap = (() => {
  const map = /* @__PURE__ */ new Map();
  for (const country of countries) {
    const existing = map.get(country.code) ?? [];
    existing.push(country);
    map.set(country.code, existing);
  }
  return map;
})();
const sortedDialCodes = Array.from(dialCodeMap.keys()).sort(
  (a, b) => b.length - a.length
);
const isoMap = (() => {
  const map = /* @__PURE__ */ new Map();
  for (const country of countries) {
    map.set(country.iso, country);
  }
  return map;
})();
const isoMaskMap = phone_masks;
function extractDigits(str) {
  return str.replace(/\D/g, "");
}
function normalizeIncomingValue(value) {
  if (!value) return "";
  if (typeof value === "string") return value;
  if (typeof value === "object") {
    if ("countryCode" in value && "nationalNumber" in value) {
      const national = extractDigits(value.nationalNumber);
      return value.countryCode ? `+${value.countryCode}${national}` : national;
    }
    if ("phone" in value && "code" in value) {
      const digits = extractDigits(value.phone);
      return value.code ? `+${value.code}${digits}` : digits;
    }
  }
  return String(value);
}
function detectCountryFromDigits(digits, defaultCountry, filteredISOs) {
  if (!digits) return null;
  for (const code of sortedDialCodes) {
    if (digits.startsWith(code)) {
      const entries = dialCodeMap.get(code);
      const candidates = filteredISOs ? entries.filter((e) => filteredISOs.has(e.iso)) : entries;
      if (candidates.length === 0) continue;
      if (candidates.length === 1) return candidates[0] ?? null;
      const preferred = candidates.find((e) => e.iso === defaultCountry);
      return preferred ?? candidates[0] ?? null;
    }
  }
  return null;
}
function formatWithMask(digits, mask) {
  let result = "";
  let digitIndex = 0;
  for (let i = 0; i < mask.length; i++) {
    if (digitIndex >= digits.length) break;
    const maskChar = mask[i];
    if (maskChar === "9") {
      result += digits[digitIndex];
      digitIndex++;
    } else if (/\d/.test(maskChar)) {
      if (digits[digitIndex] === maskChar) {
        digitIndex++;
      }
      result += maskChar;
    } else {
      result += maskChar;
    }
  }
  if (digitIndex < digits.length) {
    result += digits.slice(digitIndex);
  }
  return result;
}
function deriveNationalFormatted(internationalFormatted, countryCode) {
  let pos = 0;
  let codeDigitsConsumed = 0;
  if (internationalFormatted[pos] === "+") pos++;
  while (pos < internationalFormatted.length && codeDigitsConsumed < countryCode.length) {
    const ch = internationalFormatted[pos];
    if (/\d/.test(ch)) {
      codeDigitsConsumed++;
    }
    pos++;
  }
  while (pos < internationalFormatted.length && /[\s\-()]/.test(internationalFormatted[pos])) {
    pos++;
  }
  return internationalFormatted.slice(pos);
}
function usePhoneInput({
  value,
  onChange,
  outputFormat = "string",
  isWithCountryCode,
  defaultCountry = "US",
  includedCountries,
  excludedCountries
}) {
  const filteredISOs = useMemo(() => {
    if (!includedCountries?.length && !excludedCountries?.length) return null;
    let isos = new Set(isoMap.keys());
    if (includedCountries?.length) {
      const included = /* @__PURE__ */ new Set();
      for (const c of countries) {
        if (includedCountries.includes(c.iso) || includedCountries.includes(c.name)) {
          included.add(c.iso);
        }
      }
      isos = included;
    }
    if (excludedCountries?.length) {
      for (const c of countries) {
        if (excludedCountries.includes(c.iso) || excludedCountries.includes(c.name)) {
          isos.delete(c.iso);
        }
      }
    }
    return isos;
  }, [includedCountries, excludedCountries]);
  const [rawDigits, setRawDigits] = useState(
    () => extractDigits(normalizeIncomingValue(value))
  );
  useEffect(() => {
    const normalized = normalizeIncomingValue(value);
    const digits = extractDigits(normalized);
    setRawDigits(digits);
  }, [value]);
  const detectedCountry = useMemo(() => {
    if (!isWithCountryCode || !rawDigits) {
      if (isWithCountryCode && defaultCountry) {
        return isoMap.get(defaultCountry) ?? null;
      }
      return null;
    }
    return detectCountryFromDigits(rawDigits, defaultCountry, filteredISOs);
  }, [rawDigits, isWithCountryCode, defaultCountry, filteredISOs]);
  const displayValue = useMemo(() => {
    if (!rawDigits) return "";
    if (!isWithCountryCode) return rawDigits;
    if (detectedCountry) {
      const mask = isoMaskMap[detectedCountry.iso];
      if (mask) return formatWithMask(rawDigits, mask);
    }
    return `+${rawDigits}`;
  }, [rawDigits, isWithCountryCode, detectedCountry]);
  const e164Value = useMemo(() => {
    if (!rawDigits) return "";
    return `+${rawDigits}`;
  }, [rawDigits]);
  const objectValue = useMemo(() => {
    if (!rawDigits || !isWithCountryCode || !detectedCountry) return null;
    const countryCode = detectedCountry.code;
    const nationalNumber = rawDigits.startsWith(countryCode) ? rawDigits.slice(countryCode.length) : rawDigits;
    const internationalFormatted = displayValue;
    const nationalFormatted = deriveNationalFormatted(internationalFormatted, countryCode);
    return {
      countryCode,
      nationalNumber,
      internationalFormatted,
      nationalFormatted,
      iso: detectedCountry.iso
    };
  }, [rawDigits, isWithCountryCode, detectedCountry, displayValue]);
  const handleChange = useCallback(
    (raw) => {
      const digits = extractDigits(raw);
      setRawDigits(digits);
      if (!isWithCountryCode) {
        onChange?.(digits);
        return;
      }
      if (outputFormat === "object") {
        const country = detectCountryFromDigits(digits, defaultCountry, filteredISOs);
        if (country && digits) {
          const cc = country.code;
          const national = digits.startsWith(cc) ? digits.slice(cc.length) : digits;
          const mask = isoMaskMap[country.iso];
          const intlFormatted = mask ? formatWithMask(digits, mask) : `+${digits}`;
          const natFormatted = deriveNationalFormatted(intlFormatted, cc);
          onChange?.({
            countryCode: cc,
            nationalNumber: national,
            internationalFormatted: intlFormatted,
            nationalFormatted: natFormatted,
            iso: country.iso
          });
        } else {
          onChange?.({
            countryCode: "",
            nationalNumber: digits,
            internationalFormatted: digits ? `+${digits}` : "",
            nationalFormatted: digits,
            iso: ""
          });
        }
      } else {
        const e164 = digits ? `+${digits}` : "";
        onChange?.(e164);
      }
    },
    [isWithCountryCode, outputFormat, onChange, defaultCountry, filteredISOs]
  );
  return {
    displayValue,
    e164Value,
    objectValue,
    countryISO: detectedCountry?.iso ?? null,
    countryFlagUrl: detectedCountry?.flag ?? null,
    handleChange
  };
}

export { extractDigits, normalizeIncomingValue, usePhoneInput };
//# sourceMappingURL=usePhoneInput.js.map
