import fs from 'node:fs';
import path from 'node:path';
import https from 'node:https';

const assets = [
  { name: 'horse.png', url: 'https://i.ibb.co/4RqVNRqz/image.png' },
  { name: 'elephant.png', url: 'https://i.ibb.co/ycQ1Y6pX/image.png' },
  { name: 'palanquin.png', url: 'https://i.ibb.co/gL14Cj3K/image.png' },
  { name: 'boat.png', url: 'https://i.ibb.co/dwKsnK60/image.png' },
  { name: 'durga_final.png', url: 'https://i.ibb.co/b526CZqQ/1000008730.png' },
  { name: 'durga.png', url: 'https://i.ibb.co/Q31k7w9h/image.png' },
  { name: 'lakshmi.png', url: 'https://i.ibb.co/7x5zTj69/image.png' },
  { name: 'saraswati.png', url: 'https://i.ibb.co/xK8Hh79T/image.png' },
  { name: 'ganesha.png', url: 'https://i.ibb.co/CKNgvLxF/image.png' },
  { name: 'kartikeya.png', url: 'https://i.ibb.co/kVyKJtmd/image.png' }
];

const destDir = path.resolve('public/assets/images');
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

function download(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return resolve(download(res.headers.location, dest));
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Failed with status code: ${res.statusCode}`));
      }
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
      file.on('error', (err) => {
        fs.unlink(dest, () => {});
        reject(err);
      });
    }).on('error', reject);
  });
}

async function main() {
  console.log('Downloading assets to', destDir);
  for (const item of assets) {
    const dest = path.join(destDir, item.name);
    console.log(`Downloading ${item.name}...`);
    try {
      await download(item.url, dest);
      const stats = fs.statSync(dest);
      console.log(`✓ ${item.name} (${stats.size} bytes)`);
    } catch (err) {
      console.error(`✗ Error downloading ${item.name}:`, err.message);
    }
  }
  console.log('Done!');
}

main();
