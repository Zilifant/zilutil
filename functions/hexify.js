/**
 * Convert rgba to hex.
 * https://www.joshuamiron.com/percent-to-hex-converter
 */

// prettier-ignore
function hexify(color, options) {
  const removeAlpha = options?.removeAlpha;
  const onBlack = options?.onBlack;

  const values = color
    .replace(/rgba?\(/, '')
    .replace(/\)/, '')
    .replace(/[\s+]/g, '')
    .split(',');

  if (!removeAlpha) {
    return '#' +
      twoFiftySixToHex(values[0]) +
      twoFiftySixToHex(values[1]) +
      twoFiftySixToHex(values[2]) +
      percentToHex(values[3]);
  } else {
    const bgVal = onBlack ? 0 : 255;
    const a = parseFloat(values[3] || 1) >= 1 ? 1 : parseFloat(values[3]),
          r = Math.floor(a * parseInt(values[0]) + (1 - a) * bgVal),
          g = Math.floor(a * parseInt(values[1]) + (1 - a) * bgVal),
          b = Math.floor(a * parseInt(values[2]) + (1 - a) * bgVal);

    return '#' +
      ('0' + r.toString(16)).slice(-2).toUpperCase() +
      ('0' + g.toString(16)).slice(-2).toUpperCase() +
      ('0' + b.toString(16)).slice(-2).toUpperCase();
  }
}

function twoFiftySixToHex(val) {
  const hex = Math.round(val).toString(16).toUpperCase();
  return val < 16 ? '0' + hex : hex;
}

function percentToHex(val) {
  if (!val) return '';
  const percent = Number.isInteger(val) ? val : parseInt(val * 100);
  const decimal = Math.round((percent * 255) / 100);
  const hex = decimal.toString(16).toUpperCase();
  return percent < 7 ? '0' + hex : hex;
}

const myHex = hexify('rgba(0, 0, 0, .01)');
console.log(myHex);
