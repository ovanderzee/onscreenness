[![Build Status](https://travis-ci.com/ovanderzee/onscreenness.svg?branch=master)](https://travis-ci.com/ovanderzee/onscreenness)
[![Coverage Status](https://coveralls.io/repos/github/ovanderzee/onscreenness/badge.svg?branch=master)](https://coveralls.io/github/ovanderzee/onscreenness?branch=master)

# onscreenness
Sign up your elements and a have their onscreen presence be assessed


## Sign up your elements
Once bundled in your project onScreenness is available as a global object.
You can sign up your elements for the onScreenness-treat using a CSS selector:

    let querySelector = '#myElement'
    onScreenness.collect(querySelector);
    onScreenness.collect('.paragraph');

The collect method may be called several times to build up the collection.

Elements covered by a query in the collection can be excluded with an alternative query:

    onScreenness.exclude('.paragraph.emphasis');
    onScreenness.exclude('#that-paragraph');

CSS selectors added to the collection can be removed:

    onScreenness.remove('#myElement');

All specified queries can be removed:

    onScreenness.reset();


## Have the onscreen presence data
When the visible part of the webpage changes, the onscreenness of the collected elements is assesed.

Depending on the place the element has relative to the viewport, the element is assigned
a class 'onscreen', 'crossscreen' or 'offscreen'.

![onscreenness classes](artefacts/classes.png)

When the element covers the height or width of the viewport, the class 'overscreen' is assigned.
With stylerules you can then set the elements appearance when it enters or leaves the viewport, 
that's up to you.

Also, each involved element gets an 'onscreenness' and a 'overlapping' data attribute.
Onscreenness is the extent to which the element is inside the viewport.
Overlapping is the extent to which the element fills the viewport.

[see  demo folder](./demo)

## Inner workings

### Triggers for assesment of presence
* readystatechange to interactive
* resize window
* scrolling
* document changes

### Application Programming Interface
[see API description](./API.md)

### Version History
[see changelog](./CHANGELOG.md)