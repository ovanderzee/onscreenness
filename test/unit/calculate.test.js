/**
 * @jest-environment jsdom
 */

import {
  onScreenness,
  onScreenTest
} from '../../src/onScreenness.js';


describe('calculatePresence calculates presence by a bounding rectangle', function () {

  let presence;

  let getBoundingRects = function (scrollY = 0) {
    // in jsdom, the window has fixed size of 1024px to 768px
    // a bounding rectangle shows the current size of an element and 
    // its position relative to the viewport
    let windowWidth = 1024;
    let scrollbarWidth = 15
    let bodyMargin = 48;
    let divMarginVertical = 16;
    let divHeight = 142;
    // docHeight: 1344 ( 768 + 576 )

    let boundingRects = [];
  
    for ( let i = 0; i < 8; i++ ) {
      let top = bodyMargin + ( i * ( divHeight + divMarginVertical ) ) - scrollY;
      let bottom = top + divHeight;
      let right = windowWidth - bodyMargin - scrollbarWidth;
      let width = right - bodyMargin;
      boundingRects.push (
        {"width":width,"height":divHeight,"top":top,"right":right,"bottom":bottom,"left":bodyMargin}
      );
    }

    return boundingRects;
  };

  beforeAll(() => {
    presence = onScreenTest.calculate
    // the html element, has same size and position as the viewport (the body is the scrolling part).
    let docElem = document.documentElement;
    Object.defineProperty(docElem, 'clientWidth', {writable: true, configurable: true, value: window.innerWidth})
    Object.defineProperty(docElem, 'clientHeight', {writable: true, configurable: true, value: window.innerHeight})
  });


  /* Test scroll scenario's */

  test('scrolled up, the first div is visible, the last not', () => {
    let boundingRects = getBoundingRects();
    expect ( presence ( boundingRects[0] ).surfacePresence ).toBeGreaterThanOrEqual ( 1 );
    expect ( presence ( boundingRects[4] ).surfacePresence ).toBeGreaterThan ( 0 );
    expect ( presence ( boundingRects[4] ).surfacePresence ).toBeLessThan ( 1 );
    expect ( presence ( boundingRects[7] ).surfacePresence ).toBeLessThanOrEqual ( 0 );
    
    let surfaceOverlap0 = presence ( boundingRects[0] ).surfaceOverlap;
    let surfaceOverlap4 = presence ( boundingRects[4] ).surfaceOverlap;
    expect ( surfaceOverlap0 ).toBeGreaterThan ( surfaceOverlap4 );
    expect ( presence ( boundingRects[7] ).surfaceOverlap ).toBeLessThanOrEqual ( 0 );
  });

  test('scrolled down, the last div is visible, the first not', () => {
    let boundingRects = getBoundingRects(576);
    expect ( presence ( boundingRects[0] ).surfacePresence ).toBeLessThanOrEqual ( 0 );
    expect ( presence ( boundingRects[3] ).surfacePresence ).toBeGreaterThan ( 0 );
    expect ( presence ( boundingRects[3] ).surfacePresence ).toBeLessThan ( 1 );
    expect ( presence ( boundingRects[7] ).surfacePresence ).toBeGreaterThanOrEqual ( 1 );
    
    expect ( presence ( boundingRects[0] ).surfaceOverlap ).toBeLessThanOrEqual ( 0 );
    let surfaceOverlap3 = presence ( boundingRects[3] ).surfaceOverlap;
    let surfaceOverlap7 = presence ( boundingRects[7] ).surfaceOverlap;
    expect ( surfaceOverlap7 ).toBeGreaterThan ( surfaceOverlap3 );
  });

});



