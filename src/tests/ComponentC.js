import React from 'react';
import PropTypes from 'prop-types';

import ComponentB from './ComponentB';
import { themeit } from '../index.js';

const themeOptions = {
  mergeContext: false,
};

const ComponentC = props => (
  <div className={props.styles.test1}>
    <label className={props.styles.test2}>ComponentC label</label>
    <ComponentB />
  </div>
);

ComponentC.displayName = 'ComponentC';
ComponentC.propTypes = {
  styles: PropTypes.object,
};

export default themeit(themeOptions)(ComponentC);
