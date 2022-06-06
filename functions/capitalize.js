
// Capitalize first letter of a string

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Capitalize first letter of each word in a string

function capitalizeAll(str) {
  return str.replace(
    /\b([a-zÁ-ú])/g,
    (w) => w.charAt(0).toUpperCase() + w.slice(1)
  );
}

