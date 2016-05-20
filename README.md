# themeit - react & css modules theming made easy

themeit makes it easy to create and use different themes
for your react components while using CSS Modules or JS style objects.

It's built with code splitting in mind and allows you to
load only the themes you need at a time by utilizing code splitting.

You can also pass in a JS style object for themes which will be processed
automatically with [aphrodite](https://github.com/Khan/aphrodite).

## Installation

```Shell
npm i -S react-themeit
```

## Usage

**Component Declaration**

```Javascript
import { themeit } from 'react-themeit';

const themeOptions = {
  base: cb => require(['./base.less'], cb),
  themes: {
    blue: cb => require(['./themes/blue.less'], cb),
    big: cb => require(['./themes/big.less'], cb),
    italic: {
      label: {
        fontStyle: 'italic'
      }
    }
  }
};

const MyComponent = props => (
  <div className={props.styles.container}>
    <label className={props.styles.label}>react-themeit</label>
  </div>
);

export default themeit(themeOptions)(MyComponent);
```

**Component Usage**

```Javascript
import MyComponent from './MyComponent';

export default () => (
  <MyComponent
    theme="blue big italic"
    styles={{ label: { textDecoration: 'underline' } }}
    addFiles={cb => require(['./additionalStyles.less'], cb) }
  />
);
```

### Options

`themeit({`
- `themes` *(object)*: an object in which the *keys* represent *theme names* and the values can either be a function which should return a localized class map like { container: 'container_38h2f02h' } or a js style object like { container: { backgroundColor: '#000' } }
- [`default`] *(string)*: name of a default theme
- [`base`] *(func)*: base styles which should always be applied

`})`

A component which is wrapped with *themeit* accepts these additional props:
- `addFiles` *(func)*: a function to pass additional theme classes to the component
- `styles` *(object)*: additional js css styles to be passed to the component (will be processed with *aphrodite*)

The target component will receive the combined style classes in a property called `styles`.
It will also receive a prop named `themeit` which contains all options you passed to *themeit* and a function `setTheme(name)` which you can invoke to change the current theme of the component.

### FAQ

#### Does it work with hot reloading / HMR ?
Yes. Configuring async css files for HMR require a bit of more code though. To make it easier and shorter, *react-themeit* exports a `hot(...)` function which can be used.

Check this snippet for example:

```Javascript
import { themeit, hot } from 'react-themeit';

const themeOptions = {
  base: cb => require(['./base.less'], s => {
    hot(s, cb, c => module.hot.accept('./base.less', c))
  }),
  themes: {
    blue: cb => require(['./themes/blue.less'], cb)
  }
};
```

In this case, only the `base` .less will be hot reloadable.
The `hot` function automatically checks whether module.hot is
defined and only enables HMR if it is.

### Roadmap
- implement automatic generation of react-storybook stories

### About
![](http://ovosplay.com/img/ovosplay.png)

Initially built for use in the [ovos play game designer](http://ovosplay.com/)
to allow designers and developers to easily work together.

Contributions are very welcome!

### License
[MIT License](LICENSE)
