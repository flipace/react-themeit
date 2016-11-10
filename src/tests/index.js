import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';

import ComponentA from './ComponentA';
import ComponentC from './ComponentC';

const { describe, it } = global;

describe('themeit', () => {
  it('should pass correct classes and merge styles context for nested themed components', () => {
    const comp = mount(<ComponentA theme="black" styles={{ boldText: { fontSize: 20 } }} />);
    const html = comp.html();

    expect(html).to.contain('container_');
    expect(html).to.contain('label_');
    expect(html).to.contain('boldText_');
  });

  it('should not merge existing styles context if mergeContext=false is set in themeopts', () => {
    const MergedComp = () => (
      <ComponentA theme="black" styles={{ boldText: { fontSize: 20 } }} >
        <ComponentC />
      </ComponentA>
    );
    const comp = mount(<MergedComp />);
    const html = comp.html();

    expect(html).to.contain('container_');
    expect(html).to.contain('label_');
    expect(html.match(/boldText_/g)).to.have.length(1);
  });
});
