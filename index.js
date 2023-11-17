const { JSDOM } = require('jsdom');
const { implForWrapper } = require('jsdom/lib/jsdom/living/generated/utils');

const dom = new JSDOM(`<!DOCTYPE html>`);

// Add browser globals needed by p5
global.window = dom.window;
global.document = dom.window.document;
global.screen = dom.window.screen;
global.navigator = dom.window.navigator;
global.HTMLCanvasElement = dom.window.HTMLCanvasElement;

/**
 * Setup p5 instance for use in node
 * @param {typeof import('p5')} p5Class
 * @returns {import('p5')}
 */
function setupP5(p5Class) {
  const p5 = new p5Class();

  // add p5 methods & properties to global
  Object.keys(p5.__proto__).forEach((prop) => {
    if (typeof p5[prop] === 'function') {
      global[prop] = p5[prop].bind(p5);
    } else {
      Object.defineProperty(global, prop, {
        get() {
          return p5[prop];
        },
        set(value) {
          p5[prop] = value;
        },
      });
    }
  });

  return p5;
}

/**
 * Get node-canvas instance backing p5 canvas
 * @returns {import('canvas').Canvas}
 */
function getCanvas() {
  const canvasEl = document.querySelector('canvas');
  if (!canvasEl) throw new Error('No canvas found. Was p5 setup?')
  return implForWrapper(canvasEl)._getCanvas();
}

module.exports = {
  setupP5,
  getCanvas,
};
