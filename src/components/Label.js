import React, { PropTypes } from 'react';
import themeit from '../themeit';

const themeOptions = {
  base: cb => require(['./base.css'], cb),
  themes: {
    huge: cb => require(['./themes/huge.css'], cb),
    blue: cb => require(['./themes/blue.css'], cb),
  },
};

const Label = props => (
  <div className={props.styles.container}>
    <label className={props.styles.label}>{props.children}</label>
  </div>
);

Label.propTypes = {
  styles: PropTypes.object.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.string,
  ]),
};

export default themeit(themeOptions)(Label);
