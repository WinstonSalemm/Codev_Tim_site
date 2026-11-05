import {readdir,mkdir,writeFile} from 'node:fs/promises';
import {resolve,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import sharp from 'sharp';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const output=resolve(root,'../../data/mounted-storefront-qa');
await mkdir(output,{recursive:true});
const files=(await readdir(resolve(root,'public/media'))).filter(file=>/\.(png|jpe?g|webp)$/i.test(file));
await writeFile(resolve(output,'media-index.json'),JSON.stringify(files,null,2));
for(let offset=0;offset<files.length;offset+=35){
 const group=files.slice(offset,offset+35);const tiles=[];
 for(let i=0;i<group.length;i++){
  const img=await sharp(resolve(root,'public/media',group[i])).resize(190,150,{fit:'contain',background:'#fff'}).toBuffer();
  const label=Buffer.from(`<svg width="190" height="26"><rect width="190" height="26" fill="#eee"/><text x="8" y="19" font-family="Arial" font-size="14">${offset+i}: ${group[i].slice(0,22)}</text></svg>`);
  tiles.push({input:img,top:Math.floor(i/5)*180,left:(i%5)*200},{input:label,top:Math.floor(i/5)*180+150,left:(i%5)*200});
 }
 await sharp({create:{width:1000,height:Math.ceil(group.length/5)*180,channels:3,background:'#ddd'}}).composite(tiles).png().toFile(resolve(output,`media-audit-${offset}.png`));
}
console.log(`Prepared ${files.length} catalogue media thumbnails for visual review.`);
