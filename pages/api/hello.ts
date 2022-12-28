import { readFile } from 'fs/promises';
import type { NextApiRequest, NextApiResponse } from 'next';
import p5 from 'node-p5';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  //const canvas = createCanvas(200, 200)
  //const ctx = canvas.getContext('2d')

  const callback = async (filename: string) => {
    const file = await readFile(filename);
    res.setHeader('Content-Type', 'image/png');
    res.status(200);
    res.write(file);
    res.end();
  };

  const sketch = (p: any) => {
    let x = 100;
    let y = 100;
    let canvas: any;
    p.setup = function () {
      canvas = p.createCanvas(200, 200);
    };

    p.draw = function () {
      p.noLoop();
      p.background(0);
      p.fill(255);
      p.rect(x, y, 50, 50);
      //console.log(dataUrl)
      p.saveCanvas(canvas, 'myCanvas', 'png').then(callback);
    };
  };

  let p5Instance = p5.createSketch(sketch);
}
