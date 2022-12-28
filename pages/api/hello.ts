import type { NextApiRequest, NextApiResponse } from 'next';
//import p5 from 'node-p5';
import p5 from '@mattheath/p5js-node';
import { Readable } from 'stream';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const callback = async (stream: Readable) => {
    //const file = await readFile(filename);
    res.setHeader('Content-Type', 'image/png');
    res.status(200);
    stream.pipe(res, {
      end: true,
    });
  };

  new p5((p5: any) => {
    p5.setup = function () {
      p5.pixelDensity(1);
      p5.createCanvas(200, 200, p5.P2D);
      p5.randomSeed(10);
    };
    p5.draw = function () {
      p5.noLoop();

      p5.background(0);
      p5.fill(255);
      p5.rect(10, 100, 50, 50);
      p5.rect(100, 100, 50, 50);

      callback(p5.canvas.createPNGStream());
    };
  });
}
