import { onScreenness, onScreenTest } from '../src/onScreenness';


describe('The eventHandlers deal with live nodeLists', function () {

  let trigger;
  let liveList;
  let treat;
  let clean;

  beforeAll(() => {
    trigger = onScreenTest.triggerEvent;
    liveList = onScreenTest.makeNodeList;
    treat = onScreenTest.treatElement;
    clean = onScreenTest.cleanElements;
  });

  beforeEach(() => {
    onScreenness.reset();
    document.body.innerHTML = `
        <h2>Basic Example</h2>
        <div id="first" class="example">Basic Example Element</div>
        <div id="second" class="example">Basic Example Element</div>
        <div id="third" class="example">Basic Example Element</div>
        <div id="fourth" class="example">Basic Example Element</div>
        <div id="fifth" class="example">Basic Example Element</div>
        <div id="sixth" class="example">Basic Example Element</div>
        <div id="seventh" class="example">Basic Example Element</div>
        <div id="eighth" class="example">Basic Example Element</div>
    `;
  });


  /* Test creation of live nodeLists */

  test('live collection of .example elements in this testSuite', () => {
    onScreenness.collect('.example');
    let nodes = liveList();
    expect(nodes.length).toBe(8);
  });

  test('live collection of .example elements, exclude one element', () => {
    onScreenness.collect('.example');
    onScreenness.exclude('#second');
    let nodes = liveList();
    expect(nodes.length).toBe(7);
  });


  /* Test treat of nodes */

  test('live collection being updated with attribute', () => {
    onScreenness.collect('.example');
    trigger();
    let mirror = document.querySelectorAll ( '.example[data-onscreenness]' );
    expect(mirror.length).toBe(8);
  });

  test('live collection being updated with classes', () => {
    onScreenness.collect('.example');
    let nodes = liveList();
    nodes.forEach ( ( node, index ) => {
      let onNess = Math.round ( ( (nodes.length - 1 - index) * 2 ) / nodes.length ) / 2;
//      console.log('onNess ' + onNess)
      treat( node, {surfacePresence: onNess} )
    }); 
    let first = nodes[0];
    expect(first.classList.contains('onscreen')).toBe(true);
    let amidst = nodes[ Math.round(nodes.length / 2) ];
    expect(amidst.classList.contains('crossscreen')).toBe(true);
    let last = nodes[nodes.length - 1];
    expect(last.classList.contains('offscreen')).toBe(true);
  });

  test('removing a query immediately cleans involved elements', () => {
    onScreenness.collect('.example');
    trigger();
    let input = document.querySelectorAll ( '.example[data-onscreenness]' );
    expect(input.length).toBe(8);
    onScreenness.remove('.example');
    let output = document.querySelectorAll ( '.example[data-onscreenness]' );
    expect(output.length).toBe(0);
  });

  test('excluding a query immediately cleans involved elements', () => {
    onScreenness.collect('.example');
    trigger();
    let input = document.querySelectorAll ( '.example[data-onscreenness]' );
    expect(input.length).toBe(8);
    onScreenness.exclude('#second');
    let output = document.querySelectorAll ( '.example[data-onscreenness]' );
    expect(output.length).toBe(7);
  });

});



