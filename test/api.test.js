import onScreenness from '../src/onScreenness';

let getVars;

beforeAll(() => {
  getVars = onScreenness.testVariables;
});

beforeEach(() => {
  onScreenness.reset();
});


/* Test the API */

test('collect(query) adds one item to queryList', () => {
  let initialLength = getVars().queryList.length;
  onScreenness.collect('.myClass');
  let resultLength = getVars().queryList.length;
  expect(resultLength).toBe(initialLength + 1);
});

test('collect(multiQuery) adds two items to queryList', () => {
  let initialLength = getVars().queryList.length;
  onScreenness.collect('.myClass, #myId');
  let resultLength = getVars().queryList.length;
  expect(resultLength).toBe(initialLength + 2);
});

test('collect(multiQuery) adds only new queries to queryList', () => {
  onScreenness.collect('.myClass');
  let initialLength = getVars().queryList.length;
  onScreenness.collect('  .myClass   ,    #myId  ,  ');
  let resultLength = getVars().queryList.length;
  expect(resultLength).toBe(initialLength + 1);
});


test('exclude(query) adds one item to blackList', () => {
  let initialLength = getVars().blackList.length;
  onScreenness.exclude('.myClass');
  let resultLength = getVars().blackList.length;
  expect(resultLength).toBe(initialLength + 1);
});

test('exclude(multiQuery) adds two items to blackList', () => {
  let initialLength = getVars().blackList.length;
  onScreenness.exclude('.myClass, #myId');
  let resultLength = getVars().blackList.length;
  expect(resultLength).toBe(initialLength + 2);
});

test('exclude(multiQuery) adds only new queries to queryList', () => {
  onScreenness.exclude('.myClass');
  let initialLength = getVars().blackList.length;
  onScreenness.exclude('  .myClass   ,    #myId  ,  ');
  let resultLength = getVars().blackList.length;
  expect(resultLength).toBe(initialLength + 1);
});


test('remove(query) removes one item from queryList', () => {
  onScreenness.collect('myTag, .myClass');
  let initialLength = getVars().queryList.length;
  onScreenness.remove('.myClass');
  let resultLength = getVars().queryList.length;
  expect(resultLength).toBe(initialLength - 1);
});

test('remove(multiQuery) removes two items from queryList', () => {
  onScreenness.collect('myTag, .myClass, #myId');
  let initialLength = getVars().queryList.length;
  onScreenness.remove('.myClass, #myId');
  let resultLength = getVars().queryList.length;
  expect(resultLength).toBe(initialLength - 2);
});

test('remove(garbage) removes nothing from queryList', () => {
  onScreenness.collect('myTag, .myClass');
  let initialLength = getVars().queryList.length;
  onScreenness.remove('01234');
  let resultLength = getVars().queryList.length;
  expect(resultLength).toBe(initialLength);
});


test('reset() clears the queryList', () => {
  onScreenness.collect('myTag, .myClass, #myId');
  onScreenness.reset();
  let resultLength = getVars().queryList.length;
  expect(resultLength).toBe(0);
});

test('reset() clears the blackList', () => {
  onScreenness.collect('myTag, .myClass, #myId');
  onScreenness.reset();
  let resultLength = getVars().blackList.length;
  expect(resultLength).toBe(0);
});
