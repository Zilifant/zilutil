
// Return an 'enum', a frozen object

function newEnum(vals) {
  const enumObject = {};
  for (const val of vals) {
    enumObject[val] = val;
  }
  return Object.freeze(enumObject);
}

