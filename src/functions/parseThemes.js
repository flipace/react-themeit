/**
 * Parses a given theme string.
 */
export default function parseThemes(themeString, themes) {
  if (!themeString) return [];

  const split = themeString.split(/\s+/).filter(Boolean);

  return split.map(theme => themes[theme]);
}
