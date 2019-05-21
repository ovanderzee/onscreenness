import {
  commaSeperatedListToArray,
  queryToArray,
  roundAt
} from '../src/utilities';


test('roundAt rounds 1.005 to 1.01', () => {
  expect(roundAt(1.005, 2)).toBe(1.01);
});

test('commaSeperatedListToArray applies normalisation', () => {
  let input = '  .myClass  ,  #myId   ';
  let output = JSON.stringify(commaSeperatedListToArray(input));
  expect(output).toBe('[".myClass","#myId"]');
});

test('commaSeperatedListToArray applies sanitation', () => {
  let input = ', .myClass, #myId, ';
  let output = JSON.stringify(commaSeperatedListToArray(input));
  expect(output).toBe('[".myClass","#myId"]');
});

test('queryToArray returns a plain array with references to HTMLElements', () => {
  document.body.innerHTML = `
    <section>
      <div id="myId'" class="myClass">div 1</div>
      <div class="myClass">div 2</div>
    </section>
  `;
  let input = '.myClass, #myId';
  let output = queryToArray(input);
  expect(output.length).toBe(2);
  expect(output instanceof Array).toBe(true);
  expect(output instanceof NodeList).toBe(false);
  expect(output[0] instanceof HTMLElement).toBe(true);
});

