import type { NextApiRequest, NextApiResponse } from 'next';

import { Readable } from 'stream';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  let ctx;
  try {
    const canvas = document.createElement('canvas');
    canvas.className = 'myClass';
    canvas.id = 'myId';
    document.getElementsByTagName('body')[0].appendChild(canvas);
    ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('cant create ctx');
    ctx.fillStyle = 'green';
    ctx.fillRect(10, 10, 150, 100);
    const dataUrl = canvas.toDataURL('image/png');
    res.status(200).send(dataUrl);
  } catch (e: any) {
    return res.status(200).send(e.toString());
  } finally {
  }
}
