import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';

import themeit from '../themeit';

const { describe, it } = global;

const themeOptions = {
  themes: {
    black: {
      container: {
        backgroundColor: '#000000',
      },
      label: {
        fontFamily: 'Arial',
      },
    },
  },
};

const Demo = (props) => (
  <div className={props.styles.container}>
    <label className={props.styles.label}>A label.</label>
  </div>
);

Demo.displayName = 'Demo';
Demo.propTypes = {
  styles: React.PropTypes.object,
};

describe('themeit', () => {
  it('should pass the correct classes', () => {
    const Wrapped = themeit(themeOptions)(Demo);
    const comp = mount(<Wrapped theme="black" />);
    const html = comp.html();

    expect(html).to.contain('container_');
    expect(html).to.contain('label_');
  });
});
