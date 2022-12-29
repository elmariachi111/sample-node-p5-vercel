import type { NextApiRequest, NextApiResponse } from 'next';

import puppeteer from 'puppeteer-core';

//import p5 from 'node-p5';
// import p5 from '@mattheath/p5js-node';
import { Readable } from 'stream';
// import createBrowser from 'browserless';
// import termImg from 'term-img';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  let browser;
  try {
    browser = await puppeteer.launch({
      product: 'firefox',
      executablePath: '/opt/firefox/firefox',
      ignoreHTTPSErrors: true,
      headless: true,
      extraPrefsFirefox: {
        // Enable additional Firefox logging from its protocol implementation
        // 'remote.log.level': 'Trace',
      },
      // Make browser logs visible
      //dumpio: true,
    });
    const page = await browser.newPage();
    await page.goto('https://example.com');
    const result = await page.title();
    return res.status(200).send(result);

    // browser = await chromium.puppeteer.launch({
    //   args: chromium.args,
    //   defaultViewport: chromium.defaultViewport,
    //   executablePath: await chromium.executablePath,
    //   headless: chromium.headless,
    //   ignoreHTTPSErrors: true,
    // });
  } catch (error: any) {
    return res.status(200).send(error.toString());
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

// const callback = async (stream: Readable) => {
//   //const file = await readFile(filename);
//   res.setHeader('Content-Type', 'image/png');
//   res.status(200);
//   stream.pipe(res, {
//     end: true,
//   });
// };

// new p5((p5: any) => {
//   p5.setup = function () {
//     p5.pixelDensity(1);
//     p5.createCanvas(200, 200, p5.P2D);
//     p5.randomSeed(10);
//   };
//   p5.draw = function () {
//     p5.noLoop();

//     p5.background(0);
//     p5.fill(255);
//     p5.rect(10, 100, 50, 50);
//     p5.rect(100, 100, 50, 50);

//     callback(p5.canvas.createPNGStream());
//   };
// });
