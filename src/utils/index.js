export function formatNumber(num) {
  const parts = num.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return parts.join('.');
}

export function convertExponentialToDecimal(exponentialNumber) {
  const value = parseFloat(exponentialNumber);
  const str = value.toString();
  if (str.indexOf('e') !== -1) {
    const result = value.toFixed(10);
    return result;
  }

  return value;
}
