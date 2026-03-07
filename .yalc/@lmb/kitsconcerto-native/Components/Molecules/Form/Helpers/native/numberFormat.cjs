'use strict';

function clampNumber(n, min, max) {
  if (Number.isNaN(n)) return n;
  if (min != null && n < min) return min;
  if (max != null && n > max) return max;
  return n;
}
function parseLooseNumber(text) {
  const cleaned = text.replace(/[^0-9.\-]/g, "");
  if (!cleaned || cleaned === "-" || cleaned === "." || cleaned === "-.") return null;
  const n = Number(cleaned);
  return Number.isFinite(n) ? n : null;
}
function formatNumber(value, o) {
  if (value == null || Number.isNaN(value)) return "";
  const v = clampNumber(value, o.min, o.max);
  const nf = new Intl.NumberFormat(o.locale, {
    style: o.mode === "currency" ? "currency" : "decimal",
    currency: o.mode === "currency" ? o.currency ?? "USD" : void 0,
    useGrouping: o.useGrouping ?? true,
    minimumFractionDigits: o.minFractionDigits,
    maximumFractionDigits: o.maxFractionDigits
  });
  let out = nf.format(v);
  if (o.prefix) out = `${o.prefix}${out}`;
  if (o.suffix) out = `${out}${o.suffix}`;
  return out;
}

exports.clampNumber = clampNumber;
exports.formatNumber = formatNumber;
exports.parseLooseNumber = parseLooseNumber;
//# sourceMappingURL=numberFormat.cjs.map
