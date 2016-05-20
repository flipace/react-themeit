import React from 'react';
import { storiesOf } from '@kadira/storybook';
import Label from '../components/Label';

storiesOf('Label', module)
.add('default', () => (
  <Label>Hello world.</Label>
))
.add('huge', () => (
  <Label theme="huge">Hello world.</Label>
))
.add('blue', () => (
  <Label theme="blue">Hello world.</Label>
))
.add('huge blue', () => (
  <Label theme="huge blue">Hello world.</Label>
))
.add('custom style object', () => (
  <Label
    theme="blue"
    styles={{
      label: {
        fontSize: 18,
        fontWeight: 'bold',
      },
    }}
  >Hello world.</Label>
))
.add('additional .css file', () => (
  <Label
    theme="blue"
    addFiles={cb => require(['./additional.css'], cb)}
  >Hello world.</Label>
));
