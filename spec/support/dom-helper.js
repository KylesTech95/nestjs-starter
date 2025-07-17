const { JSDOM } = require('jsdom');

beforeAll(() => {
  const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
  global.window = dom.window;
  global.document = dom.window.document;
  // Add other DOM-related globals if needed (e.g., navigator, HTMLElement)
});

afterEach(() => {
  // Clean up DOM after each test to prevent test interference
  document.body.innerHTML = ''; 
});