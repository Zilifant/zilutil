
// Return array of values that appear in arr1 but not arr2

function diff(arr1, arr2) {
  return arr1.filter((x) => !arr2.includes(x));
}

