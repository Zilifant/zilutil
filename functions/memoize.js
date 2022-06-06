
// Memoize; save result of a fn to use/reuse later

function memoize(fn) {
  const cache = new Map();
  // check if fn has already been called; if so, return result of that call
  return (...args) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);

    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
}

