
// Add new private property (e.g. with getter/setter)

function pvp(obj, key) {
  Object.defineProperty(obj, key, {
    get: function () {
      return this[`_${key}`];
    },
    set: function (newVal) {
      this[`_${key}`] = newVal;
    },
    enumerable: true,
  });
}

