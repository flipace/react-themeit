import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';

import themeit from '../themeit';

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

  it('should accept multiple files passed by addStyleFiles property function', () => {
    const comp = mount(
      <ComponentA
        theme="black"
        addStyleFiles={cb => cb(
          require('./styles/test1'),
          require('./styles/test2'),
        )}
      />,
    );
    const html = comp.html();

    expect(html).to.contain('container_1');
    expect(html).to.contain('container_2');
    expect(html).to.contain('label_');
  });

  it('should always apply classnames in the order base => theme => passed', () => {
    let html;

    const BaseComponent = ({ styles }) => (<div className={styles.container}>I'm react-themeit'</div>);

    const options = {
      base: cb => cb(require('./styles/test1')),
      themes: {
        red: cb => cb(require('./styles/test2'))
      }
    };

    const Themed = themeit(options)(BaseComponent);
    const element = <Themed theme="red" />;

    const comp = mount(element);

    html = comp.html();

    expect(html).to.contain('container_1 container_2');

    comp.setProps({ theme: '' });

    html = comp.html();

    expect(html).to.contain('container_1');
    expect(html).not.to.contain('container_2');

    comp.setProps({ theme: 'red' });

    html = comp.html();

    expect(html).to.contain('container_1 container_2');
  });
});
