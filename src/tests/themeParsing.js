import { expect } from 'chai';

import parseThemes from '../functions/parseThemes';

const { describe, it } = global;

describe('theme parsing', () => {
  it('should return [] with null input', () => {
      const result = parseThemes(null, {});
      expect(result).to.have.length(0);
  });

  it('should return [] with undefined input', () => {
      const result = parseThemes(undefined, {});
      expect(result).to.have.length(0);
  });

  it('should return [] with empty input', () => {
      const result = parseThemes("", {});
      expect(result).to.have.length(0);
  });

  it('should return [] when input is whitespace only', () => {
    const result = parseThemes("   ", {});
    expect(result).to.have.length(0);
  });

  it('should extract words ignoring all whitespace and return map values', () => {
    const result = parseThemes("  hello    world \t foo bar ", {
      hello: 1,
      world: 2,
      foo: 3,
      bar: 4,
    });
    expect(result).to.deep.equal([1, 2, 3, 4]);
  });
});

