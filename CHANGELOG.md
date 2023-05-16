
## Version History

2.0.0

* build with esbuild
* e2e tests
* make /src importable (documentStaging, myLib)
* export items

1.5.0

* More classnames:
  * nearingscreen
  * leavingscreen
* Bugfixed: props object now also reports multiple classname additions/removals
* Followed GitHub recommendations on lodash and diff

1.4.1

* Class mutations and overhang data available to callback functions
* Prevent onscreen elements with full width or height to become overscreen, 
* Enhanced tests and readme

1.4.0

* A callback function can be passed to a query
* Refactored Module in smaller parts
* Got rid of some dependencies
* Deepscan badge for code quality

1.3.0

* Automatic collection of elements with data-onscreenness attribute
* Output esm and umd script files

1.2.4

* Integration tests with Puppeteer.
* Fix breaking bug with dependency

1.2.3

* Package the script as an umd script.
* Fix bug with cleaning elements
* Clearer texts

1.2.2

* Better definition of "overscreen"

1.2.0

* Polyfills to support MSIE 11
* More classnames:
  * overscreen
  * crossscreen
* New data-attribute "overlapping"
* Coverall badge for test-coverage at 85%

1.1.1

* Travis badge for passing tests

1.1.0

* Bugfixes
  * reset now also empties the blacklist
  * better whitespace handling on queries with multiple selectors
* Unittests for API and calculations with Jest
* Changes in the DOM will now also trigger the onscreen evaluation
* Concise coding with ES6

1.0.0

Old code extended with some collection management methods. 
With support of Babel and Rollup it was possible to assemble it to a NPM-module.


-------------------------

## toDo, toWant
* Implement Puppeteer to Istanbul (Hmmmm)
* Refine the DOM observer
