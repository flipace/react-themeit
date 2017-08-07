import React from 'react';
import ComponentB from './ComponentB';
import PropTypes from 'prop-types';

import { themeit } from '../index';

const themeOptions = {
  base: cb => cb(require('./styles/test1')),
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

const ComponentA = props => (
  <div className={props.styles.container}>
    <label className={props.styles.label}>ComponentA</label>
    <ComponentB />
    {props.children}
  </div>
);

ComponentA.displayName = 'ComponentA';
ComponentA.propTypes = {
  styles: PropTypes.object,
  children: PropTypes.node,
};

export default themeit(themeOptions)(ComponentA);
