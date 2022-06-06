
// Repeat a function

function repeat(n, fn) {
  for (let i = 0; i < n; i++) {
    return fn();
  }
}

