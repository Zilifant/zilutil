// Group objects in an array by given value of given key

function groupBy(array, key) {
  return array.reduce((acc, val) => {
    if (!acc[val[key]]) {
      acc[val[key]] = [];
    }
    acc[val[key]].push(val);
    return acc;
  }, {});
}
