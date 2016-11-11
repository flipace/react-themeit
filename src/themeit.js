import { Component, PropTypes, createElement } from 'react';
import invariant from 'invariant';

import addJsCss from './functions/addJsCss';
import parseThemes from './functions/parseThemes';
import mergeStyles from './functions/mergeStyles';

/**
 * themeit makes it dead simple to make a component themable.
 *
 * Usage:
 *
 * themeit({
 *  default: 'blue',
 * 	base: cb => require(['path/to/base.less'], cb),
 * 	mergeContext: false,
 * 	themes: {
 * 		blue: cb => require(['path/to/themes/blue.less'], cb)
 * 		italic: {
 * 			myLabel: {
 * 				fontStyle: 'italic'
 * 			}
 * 		}
 * 	}
 * })(MyComponent)
 */
export default function themeit(opts) {
  const options = {
    mergeContext: false,
    themes: {},
    ...opts,
  };

  const themeCount = Object.keys(options.themes).length;

  return TargetComponent => {
    class ThemeIt extends Component {
      static displayName = `ThemeIt(${TargetComponent.displayName})`;

      static propTypes = {
         // name of the theme to use
        theme: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.bool,
        ]),
        // optional jscss styles to be added
        // (will be appended to head with aphrodite)
        styles: PropTypes.object,
        // optional css imports to be added
        // (must be a function which calls cb(classMap1, classMap2))
        addStyleFiles: PropTypes.func,
      };

      static defaultProps = {
        theme: options.default || false,
      }

      static contextTypes = {
        styles: PropTypes.object,
      }

      static childContextTypes = {
        styles: PropTypes.object,
      };

      constructor(props, context) {
        super(props, context);

        this._isMounted = false;

        this.state = {
          styles: {},
          loadedTheme: false,
        };
      }

      getChildContext = () => ({
        styles: this.state.styles,
      });

      componentDidMount() {
        this._isMounted = true;

        this.loadTheme(this.props);
      }

      componentDidUpdate(prevProps, prevState, prevContext) {
        if (
          prevProps.theme !== this.props.theme ||
          (
            options.mergeContext &&
            JSON.stringify(prevContext.styles) !== JSON.stringify(this.context.styles)
          )
        ) {
          this.loadTheme(this.props);
        }
      }

      componentWillUnmount() {
        this._isMounted = false;
      }

      setStyles = (...classes) => {
        if (this._isMounted) {
          const { mergeContext } = options;

          // if mergeContext is true, and we have styles in context, add them to our styles array
          if (mergeContext && this.context.styles) {
            classes.push(this.context.styles);
          }

          this.setState({ styles: mergeStyles(...classes), loadedTheme: true });
        }
      };

      getthemeitProps = () => ({
        setTheme: (theme) => this.loadTheme({ ...this.props, theme }),
        ...options,
      });

      loadTheme = (props) => {
        const { base, themes } = options;
        const { theme } = props;
        let styles = [];

        // if base styles are defined, push them to our array
        if (base) styles.push(base);

        // add styles from defined themes to our styles array
        styles = styles.concat(parseThemes(theme, themes));

        // if addStyleFiles is defined, push the addStyleFiles function to the styles array
        if (props.addStyleFiles) styles.push(props.addStyleFiles);

        // if addStyleFiles is defined, push the addStyleFiles function to the styles array
        if (props.addFiles) {
          console.warn("(react-themeit) 'addFiles' is deprecated and will be removed " +
            "in the next major version. Use 'addStyleFiles' instead.");
          styles.push(props.addFiles);
        }

        // if a styles object is defined in props, add it also to our styles array
        if (props.styles) styles.push(props.styles);

        const stylesToLoad = styles.length;

        if (stylesToLoad <= 0) {
          this.setStyles();
        } else {
          const loadedStyles = [];

          const styleLoaded = (...addedStyles) => {
            const len = addedStyles.length;
            const hasHot = len > 0 && typeof addedStyles[len - 1] === 'boolean';

            if (hasHot) {
              if (addedStyles[len - 1]) {
                this.loadTheme(this.props);
                return;
              }
            }

            addedStyles.forEach((s, i) => {
              if (i < len - (hasHot ? 2 : 0)) {
                loadedStyles.push(s);
              }
            });

            if (loadedStyles.length >= stylesToLoad) this.setStyles(...loadedStyles);
          };

          styles.forEach(style => {
            invariant(style, `${TargetComponent.displayName} has no theme "${theme}"!`);

            switch (typeof style) {
              case 'function':
                style(styleLoaded);
                break;
              case 'object':
                styleLoaded(addJsCss(style));
                break;
              default: break;
            }
          });
        }
      }

      render() {
        const { loadedTheme, styles } = this.state;

        if (loadedTheme || themeCount <= 0) {
          return createElement(
            TargetComponent,
            {
              ...this.props,
              styles,
              themeit: this.getthemeitProps(),
            }
          );
        }

        return null;
      }
    }

    return ThemeIt;
  };
}
