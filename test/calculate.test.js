import { onScreenness, onScreenTest } from '../src/onScreenness';


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
    presence = onScreenTest.calculatePresence
    // the html element, has same size and position as the viewport (the body is the scrolling part).
    let docElem = document.documentElement;
    Object.defineProperty(docElem, 'clientWidth', {writable: true, configurable: true, value: window.innerWidth})
    Object.defineProperty(docElem, 'clientHeight', {writable: true, configurable: true, value: window.innerHeight})
  });

  /* Test the functions */

  test('scrolled up, the first div is visible, the last not', () => {
    let boundingRects = getBoundingRects();
    expect ( presence ( boundingRects[0] ).surface ).toBeGreaterThanOrEqual ( 1 );
    expect ( presence ( boundingRects[4] ).surface ).toBeGreaterThan ( 0 );
    expect ( presence ( boundingRects[4] ).surface ).toBeLessThan ( 1 );
    expect ( presence ( boundingRects[7] ).surface ).toBeLessThanOrEqual ( 0 );
  });

  test('scrolled dowm, the last div is visible, the first not', () => {
    let boundingRects = getBoundingRects(576);
    expect ( presence ( boundingRects[0] ).surface ).toBeLessThanOrEqual ( 0 );
    expect ( presence ( boundingRects[3] ).surface ).toBeGreaterThan ( 0 );
    expect ( presence ( boundingRects[3] ).surface ).toBeLessThan ( 1 );
    expect ( presence ( boundingRects[7] ).surface ).toBeGreaterThanOrEqual ( 1 );
  });

});



