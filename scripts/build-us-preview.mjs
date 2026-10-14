import fs from 'node:fs/promises';
const html=await fs.readFile('dist/revision-us/index.html','utf8');
await fs.writeFile('dist/index.html',html);
await fs.mkdir('dist/en',{recursive:true});
await fs.writeFile('dist/en/index.html',html);
console.log('Preview only: US proposal serves / and /en.');
