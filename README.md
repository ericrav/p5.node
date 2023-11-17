# p5.node

Run [p5.js](https://p5js.org/) sketches on the server in Node.js with [node-canvas](https://github.com/Automattic/node-canvas)
and [jsdom](https://github.com/jsdom/jsdom).

`p5.node` enables the use of p5.js global functions and variables in Node.js.

## Quick Start

```
npm i p5 p5.node
```

```js
const { setupP5, getCanvas } = require('p5.node');
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
