/**
 * Merges multiple className objects into one by concatenating
 * multiple localized classes with the same global name into one.
 */
export default function mergeStyles(...themes) {
  return themes.reduce((acc, theme) => {
    const classList = Object.keys(theme);

    classList.forEach(className => {
      const localName = theme[className];

      // check if this className is already in the merge
      if (acc[className]) {
        // if the local className does not exist in the merge scope yet add it
        if (acc[className].indexOf(localName) <= -1) {
          acc[className] = `${acc[className]} ${localName}`; // eslint-disable-line
        }
      } else {
        acc[className] = localName; // eslint-disable-line
      }
    });

    return acc;
  }, {});
}
