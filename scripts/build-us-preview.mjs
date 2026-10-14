import fs from 'node:fs/promises';
const html=await fs.readFile('dist/revision-us/index.html','utf8');
await fs.copyFile('dist/index.html','dist/checkout-app.html');
await fs.writeFile('dist/index.html',html);
await fs.mkdir('dist/en',{recursive:true});
await fs.writeFile('dist/en/index.html',html);
console.log('Preview only: US proposal serves / and /en.');

await fs.copyFile('shared/catalog.json','dist/revision-us/catalog-ar.json');

