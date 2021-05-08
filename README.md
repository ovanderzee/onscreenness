[![Build Status](https://travis-ci.com/ovanderzee/onscreenness.svg?branch=main)](https://travis-ci.com/ovanderzee/onscreenness)
[![Coverage Status](https://coveralls.io/repos/github/ovanderzee/onscreenness/badge.svg?branch=main)](https://coveralls.io/github/ovanderzee/onscreenness?branch=main)
[![DeepScan grade](https://deepscan.io/api/teams/4340/projects/6093/branches/49020/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=4340&pid=6093&bid=49020)

# onscreenness
Sign up your elements and a have their onscreen presence be assessed. 
With the html-classes and data offered here, your elements 
can make an grand entrance on the viewport!


## Setup
onScreenness is available from unpkg.com and jsdelivr.net and can thus be used in vanilla javascript apps.
With the packages on npmjs.com, onScreenness can be used in angular, vue etcetera.

[see setup guide](./SETUP.md)


## Sign up your elements
You can sign up your elements for the onScreenness-treat using a CSS selector:

    let querySelector = '#myElement'
    onScreenness.collect(querySelector)
    onScreenness.collect('.paragraph')

The collect method may be called several times to build up the collection.

Elements covered by a query in the collection can be blacklisted with an alternative query:

    onScreenness.exclude('.paragraph.emphasis')
    onScreenness.exclude('#that-paragraph')

CSS selectors added to the collection can be removed:

    onScreenness.remove('#myElement')

All specified queries can be removed:

    onScreenness.reset()


## Automatic pick-up
Onscreenness will also watch the html for elements with a data attribute:

    <section data-onscreenness>...</section>

In this case no further scripting is not scrictly needed, 
but can be desired to prevent onScreenness to be shaken out of the tree. 

    onScreenness.collect()

Blacklisting will also work on automatically picked up elements.
Resetting will work on such element when the collection contains a query capable of selecting it.

## Have the onscreen presence data
When the visible part of the webpage changes, the onscreenness of the collected elements is assesed.

Depending on the place the element has relative to the viewport, the element is assigned
a class 'onscreen', 'crossscreen' or 'offscreen'.

![onscreenness classes](artefacts/classes.png)

As some elements are too big to be assigned the 'onscreen' class, the 'overscreen' class was created.
The class 'overscreen' is assigned in two cases:

* The element covers the viewport in one aspect and is entirely visible in the other aspect.
* The element covers the viewport entirely.

Class 'overscreen' appears together with 'crossscreen', except when it covers the viewport exactly.

Apart from the classes that describe the state, there are two classes 'nearingscreen' and 'leavingscreen'.
With these you know what to expect later on.

### Styling and scripting

With stylerules you can now set the elements' appearance while it moves through the viewport, 
that's up to you.

Also, each involved element gets an 'onscreenness' and a 'overlapping' data attribute.
Onscreenness is the extent to which the element is inside the viewport.
Overlapping is the extent to which the element fills the viewport.
You could script on it.

The onscreenness properties are passed as the arguments:

    let myFunction = props => { 
        if ( props.surfacePresence > .75) {
            console.log('myElement has been visible to the user')
        }
    }
    onScreenness.collect('#myElement', myFunction);

When using a traditional function, the current element is exposed as 'this':

    let myFunction = function ( props ) { 
        if ( Number ( this.dataset['onscreenness'] ) > .75) {
            console.log(`${this.id} has been visible to the user`)
        }
    }
    onScreenness.collect('#myElement', myFunction);

The function can be run when the classname changes:

    let myFunction = function ( props ) { 
        if ( props.addClass.indexOf( 'onscreen' ) > -1 ) {
            console.log(`${this.id} has been fully visible to the user`)
        }
    }
    onScreenness.collect('#myElement', myFunction);

[see  demo folder](./demo)


## Triggers for assesment of presence
* readystatechange to interactive
* resize window
* scrolling
* document changes


## Application Programming Interface
[see API description](./API.md)


## Version History
[see changelog](./CHANGELOG.md)