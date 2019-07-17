/**
 * @jest-environment jsdom
 */

import {
  signEquality,
  arrayIntersection,
  commaSeperatedListToArray,
  queryToArray,
  roundAt
} from '../../src/utilities.js';


test('roundAt rounds 1.005 to 1.01', () => {
  expect(roundAt(1.005, 2)).toBe(1.01);
});

test('commaSeperatedListToArray applies normalisation', () => {
  let input = '  .myClass  ,  #myId   myElement ';
  let output = JSON.stringify(commaSeperatedListToArray(input));
  expect(output).toBe('[".myClass","#myId myElement"]');
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

test('arrayIntersection returns intersection of two arrays', () => {
  let array1 = [1,2,3,1,2,3]
  let array2 = [2,2,3,3,4,4]
  let output = arrayIntersection ( array1, array2 )
  expect(output).toEqual([2,3]);
});

test('signEquality returns true when all args are numbers with the sane sign, including zero', () => {
  expect( signEquality ( 0, 1, 2, 3 ) ).toBe(true)
  expect( signEquality ( 0, -1, -2, -3 ) ).toBe(true)
});

test('signEquality returns true when all args are strings with equal signed numbers, including zero', () => {
  expect( signEquality ( '0', '1', '2', '3' ) ).toBe(true)
  expect( signEquality ( '0', ' -1 ', '-2', '-3' ) ).toBe(true)
});

test('signEquality returns false when the args evaluate to numbers with mixed signs', () => {
  expect( signEquality ( 0, -1, 2, -3 ) ).toBe(false)
  expect( signEquality ( '0', '-1', '2', '-3' ) ).toBe(false)
});

test('signEquality strips whitespace, but no other not-numerics', () => {
  expect( signEquality ( ' 0 ', ' 1 ' ) ).toBe(true)
  expect( signEquality ( ' 0 ', ' 1cm ' ) ).toBe(false)
});

test('signEquality can handle array spreads', () => {
  expect( signEquality ( ...[0, 1, 2 ,3] ) ).toBe(true)
  expect( signEquality ( 0, 1, ...[2 ,3] ) ).toBe(true)
  expect( signEquality ( 0, 1, ...[-2, 3] ) ).toBe(false)
});

test('signEquality can\'t handle arrays, sets, objects or NaN', () => {
  expect( signEquality ( [0, 1, 2, 3] ) ).toBe(false)
  expect( signEquality ( 0, [1, 2, 3] ) ).toBe(false)
  expect( signEquality ( 0, '[1 ,2]' ) ).toBe(false)
  expect( signEquality ( 0, 1, new Set([1, 2, 3, 4, 5]) ) ).toBe(false)
  expect( signEquality ( 0, {x: 5} ) ).toBe(false)
  expect( signEquality ( 0, ' {x: 5} ' ) ).toBe(false)
});
