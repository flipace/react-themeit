# Change Log

### v2.4.0
- adds "themeitOptions" key to the generated component for easy access to the passed themeit options

### v2.2.0
- remove invariant for nonavailable themes
- fix issue where theme names would not be trimmed resulting in seemingly non-existent themes

### v1.2.1
- **changed** when merging context styles, put existing context styles at the beginning

### v1.2.0
- **enhanced** allow passing ```mergeContext``` as a prop to themed component

### v1.1.0
- **enhanced** ```addFiles``` property replace with ```addStyleFiles```, as it's more self-explanatory (#4 by @BonneVoyager)

### v1.0.0
- **enhanced** ```addFiles``` now can actually handle multiple files (#3)
- **new** ```mergeContext``` option (#2)

### v0.2.1
- bump aphrodite peerDep to 0.6.0

### v0.2.0
- fix flickering issue (#1 by @visuallization)

### v0.1.4
- fixes incorrect react PropType

### v0.1.3
- fixes cascading issue of localized classNames

### v0.1.2
- fixes an issue when components were unmounted before styles have been loaded

### v0.1.1
- added `hot` function export to allow easier implementation of
HMR with async css
