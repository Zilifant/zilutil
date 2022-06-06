
// Remove duplicate elements from an array

function rmDupes(array) {
  return array.reduce(
    (unique, item) => (unique.includes(item) ? unique : [...unique, item]),
    []
  );
}

