import {
  commaSeperatedListToArray,
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
