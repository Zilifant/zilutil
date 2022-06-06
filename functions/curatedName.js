
// Select a random name from a curated list

function curatedName(list) {
  const names = list || [
    "nemo",
    "cassandra",
    "olivia",
    "ragnar",
    "brand",
    "hera",
    "violet",
    "dagney",
    "baldur",
    "sigurd",
    "rhialto",
    "corwin",
    "bethany",
    "zane",
    "athena",
    "dane",
    "fili",
    "kili",
    "gloin",
    "chang",
    "sandor",
    "gerrard",
    "freya",
    "zanzel",
    "madeline",
    "arronax",
  ];
  const name = names[Math.floor(Math.random() * names.length)];
  return name[0].toUpperCase() + name.slice(1);
}

