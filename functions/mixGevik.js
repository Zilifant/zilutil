
// Gevik methods mixin

function mixGevik(obj) {
  obj = {
    ...obj,
    ...gevik(),
  };
  Object.defineProperties(obj, {
    gevi: { enumerable: true },
    geki: { enumerable: true },
    gekv: { enumerable: true },
  });
  return obj;
}

function gevik() {
  let gevik = {};
  Object.defineProperties(gevik, {
    gevi: {
      value: function (ind) {
        return this[Object.keys(this)[ind]];
      },
      enumerable: true,
    },
    geki: {
      value: function (ind) {
        return Object.keys(this)[ind];
      },
      enumerable: true,
    },
    gekv: {
      value: function (val) {
        return Object.keys(this)[Object.values(this).indexOf(val)];
      },
      enumerable: true,
    },
  });
  return gevik;
}

