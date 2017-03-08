import React from 'react';

import { themeit } from '../index.js';

const themeOptions = {
  mergeContext: true,
};

const ComponentB = props => (
  <div className={props.styles.container}>
    <label className={props.styles.label}>ComponentB label.</label>
    <span className={props.styles.boldText}>Some bold text.</span>
  </div>
);

ComponentB.displayName = 'ComponentB';
ComponentB.propTypes = {
  styles: React.PropTypes.object,
};

export default themeit(themeOptions)(ComponentB);
