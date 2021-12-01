// Core

// ~~~~~~~~~~~~~~~~~~~~
// Get a property's value by index

function gevi(obj,ind) {
  return obj[Object.keys(obj)[ind]];
};

// ~~~~~~~~~~~~~~~~~~~~
// Get a property's key by...

// ...index
function geki(obj,ind) {
  return Object.keys(obj)[ind];
};

// ...value
function gekv(obj,val) {
  return Object.keys(obj)[Object.values(obj).indexOf(val)];
};

// ~~~~~~~~~~~~~~~~~~~~
// Gevik methods mixin

function mixGevik(obj) {
  obj = {
    ...obj,
    ...gevik()
  };
  Object.defineProperties(obj, {
    gevi: { enumerable: true },
    geki: { enumerable: true },
    gekv: { enumerable: true }
  });
  return obj;
};

function gevik() {
  let gevik = {};
  Object.defineProperties(gevik, {
    gevi: {
      value: function(ind) {
        return this[Object.keys(this)[ind]];
      },
      enumerable: true
    },
    geki: {
      value: function(ind) {
        return Object.keys(this)[ind];
      },
      enumerable: true
    },
    gekv: {
      value: function(val) {
        return Object.keys(this)[Object.values(this).indexOf(val)];
      },
      enumerable: true
    }
  });
  return gevik;
};

// ~~~~~~~~~~~~~~~~~~~~
// Add new private property (e.g. with getter/setter)

function pvp(obj,key) {
  Object.defineProperty(obj, key, {
    get: function() { return this[`_${key}`] },
    set: function(newVal) { this[`_${key}`] = newVal },
    enumerable: true
  });
};

// ~~~~~~~~~~~~~~~~~~~~
// Random integer within a given range (inclusive)

function rInt(min,max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
};

// ~~~~~~~~~~~~~~~~~~~~
// Shuffle an array
// https://bost.ocks.org/mike/shuffle/

function shuffle(array) {
  let m = array.length, t, i;
  while (m) {
    i = Math.floor(Math.random() * m--);
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  };
  return array;
};

// ~~~~~~~~~~~~~~~~~~~~
// Return new object with specified properties removed

function omit(obj, keys) {
  const newObj = Object.assign({}, obj);
  keys.forEach(key => {
    if (newObj[key]) delete newObj[key];
  });
  return newObj;
};

// ~~~~~~~~~~~~~~~~~~~~
// Return random element from array

function sample(arr) {
  return arr[Math.floor(Math.random()*arr.length)];
};

// ~~~~~~~~~~~~~~~~~~~~
// Coin flip, fair or weighted
// pt = percent true (heads); no value = 50/50

function coinFlip(pt) {
  return pt ? Math.random() < (pt / 100) : Math.random() < 0.5;
};

// ~~~~~~~~~~~~~~~~~~~~
// Capitalize first letter of a string

function cap(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

// Capitalize first letter of each word in a string

function caps(str) {
  return str.replace(/\b([a-zÁ-ú])/g, (w) => w.charAt(0).toUpperCase() + w.slice(1));
};

// ~~~~~~~~~~~~~~~~~~~~
// Remove duplicate elements from an array

function rmDupes(array) {
  return array.reduce((unique, item) => unique.includes(item) ? unique : [...unique, item], []);
};

// ~~~~~~~~~~~~~~~~~~~~
// Select a random name from a curated list

function curatedName(list) {
  const names = list || [
    'nemo','cassandra','olivia','ragnar','brand','hera','violet','dagney','baldur','sigurd','rhialto','corwin','bethany','zane','athena','dane','fili','kili','gloin','chang','sandor','gerrard','freya','zanzel','madeline','arronax'
  ];
  const name = names[Math.floor(Math.random()*names.length)];
  return name[0].toUpperCase()+name.slice(1);
};

// ~~~~~~~~~~~~~~~~~~~~
// Generate a unique name

function uniqName(minLen, maxLen) {
  const
  cons = {
    c: ['w','r','t','p','s','d','f','g','h','j',
        'l','c','v','b','n','m'],
    u: ['ch','gh','th','sp','st','sh','sm','ph'],
    r: ['tt','ss','ll','bl','fl','gl','sl','pl',
        'x','z']
  },
  vows = {
    c: ['a','e','i','o','u'],
    u: ['ai','ao','au',
        'ea','ei','eo',
        'ia','ie','io',
        'oa','oe','oi','ou',
        'ua','ui'],
    r: ['ae','ue','uo','oo','ee','eu','iu']
  },
  bad_words = ['shit','piss','cunt','ass','puss','fuck','rape'],
  bad_starts = ['oo','ee','tt','ss','ll','oa','ua'],
  bad_ends = ['sp','gl','fl','pl','bl','ph','j'],
  short = Math.random() < 0.5,
  len = short ? 1 : 2,
  min_len = minLen || 4,
  max_len = maxLen || 7,
  letters = [],
  fir_let_con = Math.random() < 0.5,
  sample = arr => arr[Math.floor(Math.random()*arr.length)];

  const letter = (cv) => {
    const n = Math.random();
    return n >= .4 ? sample(cv.c)
         : n >= .1 ? sample(cv.u)
         : sample(cv.r)
  };

  for (let i = 0; i < len; i++) {
    if (fir_let_con) {
      letters.push(letter(cons));
      letters.push(letter(vows));
    } else {
      letters.push(letter(vows));
      letters.push(letter(cons));
    };
  };

  const name = letters.join('');
  const bads = [
    bad_starts.includes(name.slice(0,2)),
    bad_ends.includes(name.slice(-2)),
    bad_words.includes(name),
    name.length < min_len,
    name.length > max_len
  ];
  const bad = bads.some(el => el)

  return bad ? uniqName() : name;
};

module.exports = {
  gevi,
  geki,
  gekv,
  mixGevik,
  gevik,
  pvp,
  rInt,
  shuffle,
  omit,
  sample,
  coinFlip,
  cap,
  caps,
  rmDupes,
  curatedName,
  uniqName
};