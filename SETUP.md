

## Setup your project using a Content Delivery Network.

You could link to any npm packagefrom _https://unpkg.com_  or _https://cdn.jsdelivr.net/npm_.
Once included in your project onScreenness is available as a global object.

### Install for vanilla javascript-app from a CDN.
Place the following code in the head-section of your webpage,
then go ahead signing up elements:

    <script src="https://unpkg.com/onscreenness@latest"></script>
    <script>
        onscreenness.collect('.my-class')
    </script>


## Setup your project using NodeJS.

First, do a local install:
    
    npm install --save onscreenness

### Usage in a vanilla ES6-app.
Place the following code at the end of the body-section of your webpage:

    <script type="module">
        import onScreenness from 'onscreenness/dist/index.esm.js'
        onScreenness.collect('.my-class')
    </script>

### Usage in an angular-app.
Place the following lines of code in any component:

    import { Component } from '@angular/core';
    import onScreenness from 'onscreenness';

    @Component({
      ...
    })
    export class AppComponent {
      ...
       ngOnInit() {
         onScreenness.collect('.my-class')
       }
      ...
    }

(as in angular 7)

### Usage in a vue-app.
Place the following lines of code in any component:

    import $onScreenness from 'onscreenness'

    export default {
      created() {
        $onScreenness.collect(`.my-class[${this.$options._scopeId}]`);
      }
    }

-- or maybe clearer: 
 
    import $onScreenness from 'onscreenness'

    export default {
      created() {
        $onScreenness.collect('.my-class');
      }
      destroyed() {
        $onScreenness.reset();
      },
    }

To use onscreenness app-wide, place in entrypoint (entry|index|main.js) to use it app-wide:

    import $onScreenness from 'onscreenness'
    
    Object.defineProperty(Vue.prototype, '$onScreenness', { value: $onScreenness })
    ...
    new Vue (...)
    
and then in the main component file (App.vue):
    
    export default {
      created() {
        this.$onScreenness.collect('.my-class')
      }
    }

(as in vue 3.x)
