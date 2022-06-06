
// Return new object with specified properties removed

function omit(obj, keys) {
  const newObj = Object.assign({}, obj);
  keys.forEach((key) => {
    if (newObj[key]) delete newObj[key];
  });
  return newObj;
}

