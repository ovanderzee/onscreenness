/**
 * @jest-environment jsdom
 */

import {
  onScreenness,
  onScreenTest
} from '../../src/onScreenness.js';


describe('An element with an onscreenness data attribute in the html will be in the assesment', function () {

  let liveList;

  beforeAll(() => {
    liveList = onScreenTest.makeNodeList;
  });

  beforeEach(() => {
    onScreenness.reset();
  });


  /* Test creation of live nodeLists */

  test('A reset situation without onscreenness data attributes', () => {
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
    let nodes = liveList();
    expect(nodes.length).toBe(0);
  });

  test('A reset situation with one onscreenness data attributes', () => {
    document.body.innerHTML = `
        <h2>Basic Example</h2>
        <section>
			<div id="first" class="example">Basic Example Element</div>
			<div id="second" class="example">Basic Example Element</div>
			<div id="third" class="example">Basic Example Element</div>
			<div id="fourth" class="example" data-onscreenness>Example Element with data-onscreenness attribute</div>
			<div id="fifth" class="example">Basic Example Element</div>
			<div id="sixth" class="example">Basic Example Element</div>
			<div id="seventh" class="example">Basic Example Element</div>
			<div id="eighth" class="example">Basic Example Element</div>
        </section>
    `;
    let nodes = liveList();
    expect(nodes.length).toBe(1);
  });

  test('A reset situation with three onscreenness data attributes', () => {
    document.body.innerHTML = `
        <h2>Basic Example</h2>
        <section>
			<div id="first" class="example" data-onscreenness>Example Element with data-onscreenness attribute</div>
			<div id="second" class="example">Basic Example Element</div>
			<div id="third" class="example">Basic Example Element</div>
			<div id="fourth" class="example" data-onscreenness>Example Element with data-onscreenness attribute</div>
			<div id="fifth" class="example">Basic Example Element</div>
			<div id="sixth" class="example">Basic Example Element</div>
			<div id="seventh" class="example" data-onscreenness>Example Element with data-onscreenness attribute</div>
			<div id="eighth" class="example">Basic Example Element</div>
        </section>
    `;
    let nodes = liveList();
    expect(nodes.length).toBe(3);
  });

  test('A reset situation with three onscreenness data attributes, of which one excluded', () => {
    document.body.innerHTML = `
        <h2>Basic Example</h2>
        <section>
			<div id="first" class="example" data-onscreenness>Example Element with data-onscreenness attribute</div>
			<div id="second" class="example">Basic Example Element</div>
			<div id="third" class="example">Basic Example Element</div>
			<div id="fourth" class="example" data-onscreenness>Example Element with data-onscreenness attribute</div>
			<div id="fifth" class="example">Basic Example Element</div>
			<div id="sixth" class="example">Basic Example Element</div>
			<div id="seventh" class="example" data-onscreenness>Example Element with data-onscreenness attribute</div>
			<div id="eighth" class="example">Basic Example Element</div>
        </section>
    `;
    onScreenness.exclude('#fourth')
    let nodes = liveList();
    expect(nodes.length).toBe(2);
  });

});
