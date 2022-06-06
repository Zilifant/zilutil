
// Generate a unique name

function uniqName(minLen, maxLen) {
  const cons = {
      c: [
        "w",
        "r",
        "t",
        "p",
        "s",
        "d",
        "f",
        "g",
        "h",
        "j",
        "l",
        "c",
        "v",
        "b",
        "n",
        "m",
      ],
      u: ["ch", "gh", "th", "sp", "st", "sh", "sm", "ph"],
      r: ["tt", "ss", "ll", "bl", "fl", "gl", "sl", "pl", "x", "z"],
    },
    vows = {
      c: ["a", "e", "i", "o", "u"],
      u: [
        "ai",
        "ao",
        "au",
        "ea",
        "ei",
        "eo",
        "ia",
        "ie",
        "io",
        "oa",
        "oe",
        "oi",
        "ou",
        "ua",
        "ui",
      ],
      r: ["ae", "ue", "uo", "oo", "ee", "eu", "iu"],
    },
    bad_words = [
      "\u0073\u0068\u0069\u0074", // s**t
      "\u0070\u0069\u0073\u0073", // p**s
      "\u0063\u0075\u006e\u0074", // c**t
      "\u0061\u0073\u0073", // a**
      "\u0070\u0075\u0073\u0073", // p**s
      "\u0066\u0075\u0063\u006b", // f**k
      "\u0072\u0061\u0070\u0065", // r**e
    ],
    bad_starts = ["oo", "ee", "tt", "ss", "ll", "oa", "ua"],
    bad_ends = ["sp", "gl", "fl", "pl", "bl", "ph", "j"],
    short = Math.random() < 0.5,
    len = short ? 1 : 2,
    min_len = minLen || 4,
    max_len = maxLen || 7,
    letters = [],
    fir_let_con = Math.random() < 0.5,
    sample = (arr) => arr[Math.floor(Math.random() * arr.length)];

  const letter = (cv) => {
    const n = Math.random();
    return n >= 0.4 ? sample(cv.c) : n >= 0.1 ? sample(cv.u) : sample(cv.r);
  };

  for (let i = 0; i < len; i++) {
    if (fir_let_con) {
      letters.push(letter(cons));
      letters.push(letter(vows));
    } else {
      letters.push(letter(vows));
      letters.push(letter(cons));
    }
  }

  const name = letters.join("");
  const bads = [
    bad_starts.includes(name.slice(0, 2)),
    bad_ends.includes(name.slice(-2)),
    bad_words.includes(name),
    name.length < min_len,
    name.length > max_len,
  ];
  const bad = bads.some((el) => el);

  return bad ? uniqName() : name;
}

