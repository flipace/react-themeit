# themeit - react & css modules theming made easy
[![NPM Version](https://img.shields.io/npm/v/react-themeit.svg)](https://npmjs.com/package/react-themeit)
[![Build Status](https://travis-ci.org/flipace/react-themeit.svg?branch=master)](https://travis-ci.org/flipace/react-themeit)
[![License](https://img.shields.io/npm/l/react-themeit.svg)](https://npmjs.com/package/react-themeit)

themeit makes it easy to create and use different themes
for your react components while using CSS Modules or JS style objects.

It's built with code splitting in mind and allows you to
load only the themes you need at a time by utilizing code splitting.

You can also pass in a JS style object for themes which will be processed
automatically with [aphrodite](https://github.com/Khan/aphrodite).

[Documentation](http://neschkudla.at/react-themeit/)

## Installation

```Shell
npm i -S react-themeit
```

## Usage

(*examples assume usage of webpack*)

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
    addStyleFiles={cb => require(['./additionalStyles.less', './someMoreStyles.css'], cb) }
  />
);
```

### Options

`themeit({`
- `themes` *(object)*: an object in which the *keys* represent *theme names* and the values can either be a function which should return a localized class map like { container: 'container_38h2f02h' } or a js style object like { container: { backgroundColor: '#000' } }
- [`default`] *(string)*: name of a default theme
- [`base`] *(func)*: base styles which should always be applied
- [`mergeContext (default: false)`] *(boolean)*: whether styles contexts should be merged
`})`

A component which is wrapped with *themeit* accepts these additional props:
- `addStyleFiles` *(func)*: a function to pass additional theme classes to the component
- `styles` *(object)*: additional js css styles to be passed to the component (will be processed with *aphrodite*)

The target component will receive the combined style classes in a property called `styles`.
It will also receive a prop named `themeit` which contains all options you passed to *themeit* and a function `setTheme(name)` which you can invoke to change the current theme of the component.

### Passing style information down to child components

If you want to style nested components, react-themeit makes it super-simple to
handle even more complex scenarios. You have two options for different situations:

#### Utilizing React Context

When you wrap a component with themeit(opts)(Comp), themeit will put the *styles* object which the component receives as a property into the child context too.

This means that all child components may access the same *styles* object (which contains all the classnames) via context.

To do this, you'd define your child component like so:

```javascript
import React, { Component, PropTypes } from 'react';

const MyComponent = (props, context) => (
  <div className={context.styles.container} />
);

MyComponent.contextTypes = {
  styles: PropTypes.object
}
```

#### Nested themeable components

If you use *themeit* to wrap your child components too, there might be two ways you'd like themeit to handle context and passed style information:

**a)** Merge the eventual ```context.styles``` information from parent themeit components.


```javascript
import React, { Component, PropTypes } from 'react';
import { themeit } from 'react-themeit';

const themeOptions = {
  mergeContext: true
};

const MyComponent = (props, context) => (
  <div className={context.styles.container} />
);

MyComponent.contextTypes = {
  styles: PropTypes.object
}

export default themeit(themeOptions)(MyComponent)
```

**When is this useful?**
Imagine you have a calculator widget where the calculater itself is a themeable component and the individual keys in the calculator component are also themeable components.

You might want to define themes / style information for the keys
with themeit. If you were to use the calculator widget however,
you'd also want to pass new/additional style information for the keys to the calculator widget.

One way to deal with this would be to accept a separate prop like ```stylesForKeys``` or ```addStyleFilesForKeys``` and pass these props down to each individual key. However, this sucks.

Instead, you may just use the ```addStyleFiles``` prop to pass style information for the whole widget + its themeable child components. And utilize the ```mergeContext``` option to merge all style information for the Key components.

**b)** Ignore parent styles information and create a new styles context from the component

If you'd like to completely ignore parent styles information, you can just use *themeit* as usual. By default, it won't merge style information for nested themed components.

This is important, since it could lead to unwanted behavior when you use the same class names (e.g. "container") for totally different components. That's why themeit wants you to explicitly activate the behavior of merging styles information for nested themeable components.

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
