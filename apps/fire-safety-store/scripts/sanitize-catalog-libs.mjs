import {readFile,writeFile,readdir} from 'node:fs/promises';
import {resolve,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
for(const file of ['src/lib/metadata.ts','src/lib/categoryLongContent.ts']){
 const path=resolve(root,file);let text=await readFile(path,'utf8');
 text=text.replace(/POJ[ -]?PRO/gi,'FireSafe').replace(/Ташкент[ауе]?/g,'Демоград').replace(/Tashkent|Toshkent/g,'Demo City');
 await writeFile(path,text);
}
