/**
 * Parses a given theme string.
 */
export default function parseThemes(themeString, themes) {
  if (!themeString) return [];

  const split = themeString.split(' ');

  return split.map(theme => themes[theme].trim());
}
