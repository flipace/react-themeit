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
    addStyleFiles={cb => require(['./additional.css'], cb)}
  >Hello world.</Label>
))
.add('fancy stuff', () => {
  class DemoFancy extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        theme: 'blue',
      };
    }

    change = () => {
      const themes = [
        'blue',
        '',
        'blue huge',
        'huge',
      ];

      const randomIndex = Math.round(Math.random() * (themes.length - 1));

      this.setState({ theme: themes[randomIndex] });
    }

    render() {
      const { theme } = this.state;

      return (
        <div>
          <Label
            theme={theme}
          >
            Hello world.
          </Label>
          <button onClick={this.change}>Change</button>
        </div>
      );
    }
  }

  return <DemoFancy />;
});
