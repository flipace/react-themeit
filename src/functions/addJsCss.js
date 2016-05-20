import { StyleSheet, css } from 'aphrodite';

export default function addJsCss(styles) {
  const keys = Object.keys(styles);

  if (typeof styles[keys[0]] !== 'object') {
    throw new Error('Invalid JSCSS structure.');
  }

  const stylesheet = StyleSheet.create(styles);

  return keys.reduce((acc, style) => {
    acc[style] = css(stylesheet[style]); // eslint-disable-line
    return acc;
  }, {});
}
