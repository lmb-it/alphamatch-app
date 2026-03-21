'use strict';

function isDigit(c) {
  return /^[0-9]$/.test(c);
}
function isAlpha(c) {
  return /^[A-Za-z]$/.test(c);
}
function isAlphaNum(c) {
  return /^[A-Za-z0-9]$/.test(c);
}
function tokenizeMask(mask) {
  const q = mask.indexOf("?");
  const main = q >= 0 ? mask.slice(0, q) : mask;
  const tokens = [];
  for (const ch of main) {
    if (ch === "9") tokens.push({ t: "digit" });
    else if (ch === "a") tokens.push({ t: "alpha" });
    else if (ch === "*") tokens.push({ t: "alphanum" });
    else tokens.push({ t: "lit", v: ch });
  }
  return { tokens, optionalFrom: q >= 0 ? tokens.length : Number.POSITIVE_INFINITY };
}
function formatWithMask(raw, mask) {
  const { tokens } = tokenizeMask(mask);
  const src = raw.split("");
  let si = 0;
  let masked = "";
  let unmasked = "";
  for (const token of tokens) {
    if (token.t === "lit") {
      masked += token.v;
      continue;
    }
    while (si < src.length) {
      const c = src[si++] ?? "";
      const ok = token.t === "digit" ? isDigit(c) : token.t === "alpha" ? isAlpha(c) : isAlphaNum(c);
      if (ok) {
        masked += c;
        unmasked += c;
        break;
      }
    }
    if (si >= src.length && masked.length === 0) break;
  }
  return { masked, unmasked };
}

exports.formatWithMask = formatWithMask;
exports.tokenizeMask = tokenizeMask;
//# sourceMappingURL=mask.cjs.map
