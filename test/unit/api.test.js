/**
 * @jest-environment jsdom
 */

import {
  collectionManagement
} from '../../src/collectionManagement.js';


describe('The API manages queryLists', function () {

  let getVars;

  beforeAll(() => {
    getVars = collectionManagement.getVariables;
  });

  beforeEach(() => {
    collectionManagement.reset();
  });


  /* Test collect method */

  test('collect(query) adds one item to queryList', () => {
    let initialLength = getVars().queryKeys.length;
    collectionManagement.collect('.myClass');
    let resultLength = getVars().queryKeys.length;
    expect(resultLength).toBe(initialLength + 1);
  });

  test('collect(multiQuery) adds two items to queryList', () => {
    let initialLength = getVars().queryKeys.length;
    collectionManagement.collect('.myClass, #myId');
    let resultLength = getVars().queryKeys.length;
    expect(resultLength).toBe(initialLength + 2);
  });

  test('collect(multiQuery) adds only new queries to queryList', () => {
    collectionManagement.collect('.myClass');
    let initialLength = getVars().queryKeys.length;
    collectionManagement.collect('  .myClass   ,    #myId  ,  ');
    let resultLength = getVars().queryKeys.length;
    expect(resultLength).toBe(initialLength + 1);
  });

  test('collect(query) cannot duplicate', () => {
    collectionManagement.collect('.myClass');
    let initialLength = getVars().queryKeys.length;
    collectionManagement.collect('.myClass');
    let resultLength = getVars().queryKeys.length;
    expect(resultLength).toBe(initialLength);
  });


  /* Test exclude method */

  test('exclude(query) adds one item to blackList', () => {
    let initialLength = getVars().blackList.length;
    collectionManagement.exclude('.myClass');
    let resultLength = getVars().blackList.length;
    expect(resultLength).toBe(initialLength + 1);
  });

  test('exclude(multiQuery) adds two items to blackList', () => {
    let initialLength = getVars().blackList.length;
    collectionManagement.exclude('.myClass, #myId');
    let resultLength = getVars().blackList.length;
    expect(resultLength).toBe(initialLength + 2);
  });

  test('exclude(multiQuery) adds only new queries to queryList', () => {
    collectionManagement.exclude('.myClass');
    let initialLength = getVars().blackList.length;
    collectionManagement.exclude('  .myClass   ,    #myId  ,  ');
    let resultLength = getVars().blackList.length;
    expect(resultLength).toBe(initialLength + 1);
  });

  test('exclude(query) cannot duplicate', () => {
    collectionManagement.exclude('.myClass');
    let initialLength = getVars().blackList.length;
    collectionManagement.exclude('.myClass');
    let resultLength = getVars().blackList.length;
    expect(resultLength).toBe(initialLength);
  });


  /* Test remove method */

  test('remove(query) removes one item from queryList', () => {
    collectionManagement.collect('myTag, .myClass');
    let initialLength = getVars().queryKeys.length;
    collectionManagement.remove('.myClass');
    let resultLength = getVars().queryKeys.length;
    expect(resultLength).toBe(initialLength - 1);
  });

  test('remove(multiQuery) removes two items from queryList', () => {
    collectionManagement.collect('myTag, .myClass, #myId');
    let initialLength = getVars().queryKeys.length;
    collectionManagement.remove('.myClass, #myId');
    let resultLength = getVars().queryKeys.length;
    expect(resultLength).toBe(initialLength - 2);
  });

  test('remove(garbage) removes nothing from queryList', () => {
    collectionManagement.collect('myTag, .myClass');
    let initialLength = getVars().queryKeys.length;
    collectionManagement.remove('01234');
    let resultLength = getVars().queryKeys.length;
    expect(resultLength).toBe(initialLength);
  });


  /* Test reset method */

  test('reset() clears the queryList', () => {
    collectionManagement.collect('myTag, .myClass, #myId');
    collectionManagement.reset();
    let resultLength = getVars().queryKeys.length;
    expect(resultLength).toBe(0);
  });

  test('reset() clears the blackList', () => {
    collectionManagement.collect('myTag, .myClass, #myId');
    collectionManagement.reset();
    let resultLength = getVars().blackList.length;
    expect(resultLength).toBe(0);
  });

});