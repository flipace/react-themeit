import { StyleSheet, css } from 'aphrodite';

export default function addJsCss(styles) {
  const keys = Object.keys(styles);

  if (process.env.NODE_ENV === 'development' && typeof styles[keys[0]] !== 'object') {
    console.warn(`Detected empty object passed to themed component... This might not be intentional.`);
    return {};
  }

  const stylesheet = StyleSheet.create(styles);

  return keys.reduce((acc, style) => {
    acc[style] = css(stylesheet[style]); // eslint-disable-line
    return acc;
  }, {});
}
