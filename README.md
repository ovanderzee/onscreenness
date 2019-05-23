[![Build Status](https://travis-ci.com/ovanderzee/onscreenness.svg?branch=master)](https://travis-ci.com/ovanderzee/onscreenness)

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
On selected events that change the contents of the viewport, the collection is iterated.
Of any element involved is assesed to what extent its bounding rectangle is present in the viewport.
This fraction is put in the data-onscreenness attribute.
Also, a classname "onscreen" is assigned when the element is completely inside viewport, 
and "offscreen" when it is completely outside the viewport.

With stylerules you can then set the elements appearance when it enters or leaves the viewport, 
that's up to you .

<a href="demo">see demo folder</a>. 


## Inner workings

### Triggers for assesment of presence
* readystatechange to interactive
* resize window
* scrolling
* DOM observation

### Application Programming Interface
<a href="API.md">see API description</a>. 
