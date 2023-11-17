const fs = require('fs');
const { setupP5, getCanvas } = require('..');
setupP5(require('p5'));

window.setup = () => {
  createCanvas(800, 800);
  background(220);
};

window.draw = () => {
  fill(random(255), random(255), random(255));

  circle(random(width), random(height), 25 + random(50));

  if (frameCount > 250) {
    noLoop();

    const out = fs.createWriteStream('output-basic.png');
    const canvas = getCanvas();
    const stream = canvas.createPNGStream();

    stream.pipe(out);
    out.on('finish', () => console.log('Done rendering'));
  }
};
