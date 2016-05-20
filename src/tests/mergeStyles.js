import _ from 'lodash';
import mergeStyles from '../functions/mergeStyles';
import { expect } from 'chai';
const { describe, it } = global;

const classes = ['element', 'container', 'label', 'button', 'red', 'blue'];
const styleObjects = [];

for (let i = 0; i <= 50; i++) {
  const class1 = classes[Math.round(Math.random() * (classes.length - 1), 0)];
  const class2 = classes[Math.round(Math.random() * (classes.length - 1), 0)];

  styleObjects.push({
    [class1]: `${class1}_styles_${i}`,
    [class2]: `${class2}_styles_${i}`,
  });
}

describe('mergeStyles', () => {
  it('should return an object', () => {
    const res = mergeStyles.apply(null, styleObjects);
    expect(res).to.be.an('object');
  });
  it('should contain all keys from the passed objects', () => {
    const res = mergeStyles.apply(null, styleObjects);
    expect(res).to.contain.all.keys(classes);
    expect(Object.keys(res).length).to.be.within(1, classes.length);
  });
  it('should concatenate all strings from equal keys with whitespace separator', () => {
    const res = mergeStyles.apply(null, styleObjects);
    _.each(res, (val, key) => {
      expect(val).to.contain('_');
      expect(val).to.contain(' ');
      expect(val).to.contain(key);
      expect(val).to.not.match(new RegExp(classes.filter(c => c !== key).join('|')));
    });
  });
});
