# p5.node

<a href="https://www.npmjs.com/package/@ericrav/p5.node">
  <img src="https://img.shields.io/npm/v/@ericrav/p5.node">
</a>

Run [p5.js](https://p5js.org/) sketches on the server in Node.js with [node-canvas](https://github.com/Automattic/node-canvas)
and [jsdom](https://github.com/jsdom/jsdom).

`p5.node` enables the use of p5.js global functions and variables in Node.js.

## Quick Start

```
npm i p5 @ericrav/p5.node
```

```js
const { setupP5, getCanvas } = require('@ericrav/p5.node');
const p = setupP5(require('p5'));

const fs = require('fs');

window.setup = () => {
  createCanvas(400, 400);
  noLoop();
};

window.draw = () => {
  background(220);
  circle(200, 200, 50);

  // Save sketch to file
  const out = fs.createWriteStream('sketch.png');
  const canvas = getCanvas(); // get node-canvas instance
  const stream = canvas.createPNGStream();
  stream.pipe(out);
  out.on('finish', () => console.log('Done rendering'));
};
```

## Use with `canvas-sketch`

`p5.node` can be used with @mattdesl's excellent [`canvas-sketch`](https://github.com/mattdesl/canvas-sketch) framework in p5 mode.

```js
const canvasSketch = require('canvas-sketch');
const { setupP5, getCanvas } = require('@ericrav/p5.node');
const p5 = require('p5');
const fs = require('fs');

setupP5(p5);

const settings = {
  p5: true,
  dimensions: [720, 400],
};

const sketch = () => {
  background(random(255), random(255), random(255));
  noFill();
  stroke(255);

  return ({ context, width, height }) => {
    background(0);
    circle(width / 2, height / 2, 50);
  };
};

canvasSketch(sketch, settings).then(() => {
  const out = fs.createWriteStream('output.png');
  const canvas = getCanvas();
  const stream = canvas.createPNGStream();

  stream.pipe(out);
  out.on('finish', () => console.log('Done rendering'));
});
```
