import React from 'react';
import ComponentB from './ComponentB';
import { themeit } from '../index.js';

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

const ComponentA = (props) => (
  <div className={props.styles.container}>
    <label className={props.styles.label}>ComponentA</label>
    <ComponentB />
    {props.children}
  </div>
);

ComponentA.displayName = 'ComponentA';
ComponentA.propTypes = {
  styles: React.PropTypes.object,
  children: React.PropTypes.node,
};

export default themeit(themeOptions)(ComponentA);
