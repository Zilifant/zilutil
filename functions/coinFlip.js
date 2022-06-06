
// Coin flip, fair or weighted
// pt = percent true (heads); no value = 50/50

/**
 * Flip a coin, fair or weighted.
 * @param {number} [n=50] - A number between 1 and 100, which will be the
 * percent chance the result is `true`.
 */

function coinFlip(pt) {
  return pt ? Math.random() < pt / 100 : Math.random() < 0.5;
}

