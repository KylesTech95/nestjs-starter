const DomManipulator = require('./dom-manipulator'); 

describe('DomManipulator', function() {
  let domManipulator;

  beforeEach(function() {
    domManipulator = new DomManipulator();
  });

  it('should add a div to the DOM', function() {
    domManipulator.addDiv('test-div', 'Hello World!');
    const newDiv = document.getElementById('test-div');
    expect(newDiv).not.toBeNull();
    expect(newDiv.textContent).toBe('Hello World!');
  });
});
