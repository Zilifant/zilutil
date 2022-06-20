// convert an object to an array

function objectToArray(obj) {
  const array = [];
  for (const key in obj) {
    array.push({ key, val: obj[key] });
  }
  return array;
}
