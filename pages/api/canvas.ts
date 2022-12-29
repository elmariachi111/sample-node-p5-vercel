import type { NextApiRequest, NextApiResponse } from 'next';

import { Readable } from 'stream';
import { createCanvas } from '@napi-rs/canvas';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const canvas = createCanvas(300, 320);
    const ctx = canvas.getContext('2d');

    ctx.lineWidth = 10;
    ctx.strokeStyle = '#03a9f4';
    ctx.fillStyle = '#03a9f4';

    // Wall
    ctx.strokeRect(75, 140, 150, 110);

    // Door
    ctx.fillRect(130, 190, 40, 60);

    // Roof
    ctx.beginPath();
    ctx.moveTo(50, 140);
    ctx.lineTo(150, 60);
    ctx.lineTo(250, 140);
    ctx.closePath();
    ctx.stroke();
    const pngData = canvas.toBuffer('image/png');

    res.status(200);
    res.setHeader('Content-Type', 'image/png');
    const readable = Readable.from(pngData);
    readable.pipe(res);
  } catch (e: any) {
    return res.status(200).send(e.toString());
  }
}
