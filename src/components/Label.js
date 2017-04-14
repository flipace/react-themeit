import React from 'react';
import PropTypes from 'prop-types';
import themeit from '../themeit';

const themeOptions = {
  base: cb => cb(require('./base.css')),
  themes: {
    huge: cb => cb(require('./themes/huge.css')),
    blue: cb => cb(require('./themes/blue.css')),
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
