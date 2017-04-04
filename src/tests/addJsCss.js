import addJsCss from '../functions/addJsCss';
import { expect } from 'chai';
const { describe, it } = global;

const testJsCss = {
  element: {
    fontFamily: 'Arial',
  },
  container: {
    backgroundColor: '#000999',
  },
};

const failJs = {
  fontFamily: 'Arial',
};

describe('addJsCss', () => {
  it('should return an object', () => {
    const res = addJsCss(testJsCss);
    expect(res).to.be.an('object');
  });
  it('should return an object with the same keys', () => {
    const res = addJsCss(testJsCss);
    expect(Object.keys(res)).to.include.members(Object.keys(testJsCss));
  });
  it('should return an object with localized classes as key values', () => {
    const res = addJsCss(testJsCss);
    expect(res.element).to.be.a('string');
    expect(res.container).to.be.a('string');
  });
});
