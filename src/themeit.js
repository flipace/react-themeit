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
 * 	base: cb => require(['path/to/base.less'], cb)
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
  return TargetComponent => {
    invariant(opts.themes, `No 'themes' specified for ${TargetComponent}!`);

    class ThemeIt extends Component {
      static displayName = `ThemeIt(${TargetComponent.displayName})`;

      static propTypes = {
         // name of the theme to use
        theme: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.boolean,
        ]),
        // optional jscss styles to be added
        // (will be appended to head with aphrodite)
        styles: PropTypes.object,
        // optional css imports to be added
        // (must be a function which calls cb(classMap1, classMap2))
        addFiles: PropTypes.func,
      };

      static defaultProps = {
        theme: opts.default || false,
      }

      static childContextTypes = {
        styles: PropTypes.object,
      };

      constructor(props) {
        super(props);

        this._isMounted = false;

        this.state = {
          styles: {},
          loadedTheme: false,
        };
      }

      getChildContext = () => {
        return {
          styles: this.state.styles,
        };
      };

      componentDidMount() {
        this._isMounted = true;

        this.loadTheme(this.props);
      }

      componentDidUpdate(prevProps) {
        if (prevProps.theme !== this.props.theme) {
          this.loadTheme(this.props);
        }
      }

      componentWillUnmount() {
        this._isMounted = false;
      }

      setStyles = (...classes) => {
        if (this._isMounted) {
          this.setState({ styles: mergeStyles(...classes), loadedTheme: true });
        }
      };

      getthemeitProps() {
        const loadTheme = this.loadTheme.bind(this);

        return {
          setTheme: (theme) => { loadTheme({ ...this.props, theme }); },
          ...opts,
        };
      }

      loadTheme(props) {
        const { theme } = props;
        const styles = [
          ...parseThemes(theme, opts.themes),
        ];

        if (opts.base) styles.push(opts.base);
        if (props.addFiles) styles.push(props.addFiles);
        if (props.styles) styles.push(props.styles);

        const stylesToLoad = styles.length;
        const loadedStyles = [];

        const styleLoaded = (s, hot = false) => {
          if (hot) {
            this.loadTheme(this.props);
            return;
          }

          loadedStyles.push(s);

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

      render() {
        const { styles } = this.state;

        return createElement(
          TargetComponent,
          {
            ...this.props,
            styles,
            themeit: this.getthemeitProps(),
          }
        );
      }
    }

    return ThemeIt;
  };
}
