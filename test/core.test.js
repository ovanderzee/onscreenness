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
        <section>
			<div id="first" class="example">Basic Example Element</div>
			<div id="second" class="example">Basic Example Element</div>
			<div id="third" class="example">Basic Example Element</div>
			<div id="fourth" class="example">Basic Example Element</div>
			<div id="fifth" class="example">Basic Example Element</div>
			<div id="sixth" class="example">Basic Example Element</div>
			<div id="seventh" class="example">Basic Example Element</div>
			<div id="eighth" class="example">Basic Example Element</div>
        </section>
    `;
  });


  /* Test creation of live nodeLists */

  test('live collection of .example elements in this testSuite', () => {
    onScreenness.collect('.example');
    let nodes = liveList();
    expect(nodes.length).toBe(8);
  });

  test('live collection of .example elements, exclude one element with an alternative query', () => {
    onScreenness.collect('.example');
    onScreenness.exclude('#second');
    let nodes = liveList();
    expect(nodes.length).toBe(7);
  });


  /* Test treat of nodes */

  test('live collection being updated with same attributes', () => {
    onScreenness.collect('.example');
    trigger();
    let mirror1 = document.querySelectorAll ( '.example[data-onscreenness]' );
    expect(mirror1.length).toBe(8);
    let mirror2 = document.querySelectorAll ( '.example[data-overlapping]' );
    expect(mirror1).toEqual(mirror2);
  });

  test('live collection being updated with presence classes', () => {
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

  test('live collection being updated with overscreen class when '+
  ' the element covers the screen in one aspect and is totally visible in the other aspect'+
  ' or the element covers the screen in both aspects', () => {
    onScreenness.collect('section');
    let node = liveList()[0];

    treat( node, {
		horizonOverlap: .5,
		verticaOverlap: .5,
		horizonPresence: 1,
		verticaPresence: 1,
    } );
    expect(node.classList.contains('overscreen')).toBe(false);

    // covers screen entirely
    treat( node, {
		horizonOverlap: 1,
		verticaOverlap: 1,
		horizonPresence: .5,
		verticaPresence: .5,
    } );
    expect(node.classList.contains('overscreen')).toBe(true);

    // covers screen vertically and entirely visible horizontally
    treat( node, {
		horizonOverlap: .5,
		verticaOverlap: 1,
		horizonPresence: 1,
		verticaPresence: .5,
    } );
    expect(node.classList.contains('overscreen')).toBe(true);

    // covers screen horizontally and entirely visible vertically
    treat( node, {
		horizonOverlap: 1,
		verticaOverlap: .5,
		horizonPresence: .5,
		verticaPresence: 1,
    } );
    expect(node.classList.contains('overscreen')).toBe(true);
  });

  test('removing a query immediately cleans classes from involved elements', () => {
    onScreenness.collect('section, .example');
	document.querySelector('section').classList.add('overscreen');
	document.getElementById('first').classList.add('onscreen');
	document.getElementById('second').classList.add('crossscreen');
	document.getElementById('third').classList.add('offscreen');

    onScreenness.remove('section, .example');
    let output1 = document.querySelectorAll ( '.overscreen' );
    expect(output1.length).toBe(0);
    let output2 = document.querySelectorAll ( '.onscreen' );
    expect(output2.length).toBe(0);
    let output3 = document.querySelectorAll ( '.crossscreen' );
    expect(output3.length).toBe(0);
    let output4 = document.querySelectorAll ( '.offscreen' );
    expect(output4.length).toBe(0);
  });

  test('excluding a query immediately cleans classes from involved elements', () => {
    onScreenness.collect('section, .example');
	document.querySelector('section').classList.add('overscreen');
	document.getElementById('first').classList.add('onscreen');
	document.getElementById('second').classList.add('crossscreen');
	document.getElementById('third').classList.add('offscreen');

    onScreenness.exclude('h2 + section, .example');
    let output1 = document.querySelectorAll ( '.overscreen' );
    expect(output1.length).toBe(0);
    let output2 = document.querySelectorAll ( '.onscreen' );
    expect(output2.length).toBe(0);
    let output3 = document.querySelectorAll ( '.crossscreen' );
    expect(output3.length).toBe(0);
    let output4 = document.querySelectorAll ( '.offscreen' );
    expect(output4.length).toBe(0);
  });

  test('removing a query immediately cleans data attributes from involved elements', () => {
    onScreenness.collect('.example');
    trigger();
    let input1 = document.querySelectorAll ( '.example[data-onscreenness]' );
    expect(input1.length).toBe(8);
    let input2 = document.querySelectorAll ( '.example[data-overlapping]' );
    expect(input2.length).toBe(8);
    onScreenness.remove('.example');
    let output1 = document.querySelectorAll ( '.example[data-onscreenness]' );
    expect(output1.length).toBe(0);
    let output2 = document.querySelectorAll ( '.example[data-overlapping]' );
    expect(output2.length).toBe(0);
  });

  test('excluding a query immediately cleans data attributes from involved elements', () => {
    onScreenness.collect('.example');
    trigger();
    let input1 = document.querySelectorAll ( '.example[data-onscreenness]' );
    expect(input1.length).toBe(8);
    let input2 = document.querySelectorAll ( '.example[data-overlapping]' );
    expect(input2.length).toBe(8);
    onScreenness.exclude('#second');
    let output1 = document.querySelectorAll ( '.example[data-onscreenness]' );
    expect(output1.length).toBe(7);
    let output2 = document.querySelectorAll ( '.example[data-overlapping]' );
    expect(output2.length).toBe(7);
  });

});



