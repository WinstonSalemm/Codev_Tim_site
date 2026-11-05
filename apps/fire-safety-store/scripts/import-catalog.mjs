import {readFile, writeFile, mkdir, cp, readdir} from 'node:fs/promises';
import {resolve, dirname, basename} from 'node:path';
import {fileURLToPath} from 'node:url';

// One-time import of public catalogue material; never import database credentials or customer records.
const target = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const source = resolve(process.argv[2] || 'C:/dev/poj-pro/Poj-Pro');
const exported = resolve(source, 'outputs/poj-pro-catalog-2026-10-22');
const read = async name => JSON.parse((await readFile(resolve(exported, `${name}.json`), 'utf8')).replace(/^\uFEFF/, ''));
const clean = value => typeof value === 'string' ? value
  .replace(/(?:https?:\/\/)?(?:www\.)?poj[ -]?pro(?:\.uz)?/gi, 'FireSafe')
  .replace(/пож[ -]?про/gi, 'FireSafe')
  .replace(/Ташкент\S*/gi, 'Демо-город').replace(/Tashkent|Toshkent/gi, 'Demo City')
  .replace(/\+?998[\s()\d-]{9,18}/g, '+000 42 731 58 26')
  : Array.isArray(value) ? value.map(clean) : value && typeof value === 'object' ? Object.fromEntries(Object.entries(value).map(([k,v]) => [k,clean(v)])) : value;
await mkdir(resolve(target, 'data'), {recursive:true});
await mkdir(resolve(target, 'public/media'), {recursive:true});
const promotionArtwork={ 'bcd3aeb4-dd10-4b04-b719-e5c5038df746':'ru', 'e9fb8996-b2cc-4762-b70c-e940f6a3bb6e':'en', 'f04fc941-30df-4ddc-8c3d-cb1d2dac0a75':'uz' };
const brandedProducts=['b8b2c6c7-0e13-4e92-bd9d-d9796eb074a4','cf2ac71f-06e9-40b8-b2cf-5899f51b29df'];
for(const file of await readdir(resolve(exported,'media'))) {
  if([...Object.keys(promotionArtwork),...brandedProducts].some(id=>file.includes(id))) continue;
  await cp(resolve(exported,'media',file),resolve(target,'public/media',file));
}
const media = value => value?.file ? brandedProducts.some(id=>value.file.includes(id)) ? '/fire-safety-store/media/firesafe-aerosol-module.svg' : `/fire-safety-store/media/${basename(value.file)}` : null;
const categoriesRaw = await read('Category');
const categoryTranslations = await read('CategoryI18n');
const translations = await read('ProductI18n');
const imagesRaw = await read('ProductImage');
const imageMap = Object.fromEntries(imagesRaw.map(image => [image.id, promotionArtwork[image.id] ? `/fire-safety-store/promotions/offer-${promotionArtwork[image.id]}.svg` : media(image.data)]));
const categories = categoriesRaw.map(category => ({id:category.id,slug:category.slug,name:category.name,image:media(category.imageData),imageData:null,i18n:categoryTranslations.filter(row => row.categoryId === category.id).map(({locale,name}) => ({locale,name}))}));
const products = (await read('Product')).filter(row => row.isActive).map(product => ({...product,price:Number(product.price),isActive: true,i18n:translations.filter(row => row.productId===product.id),images:imagesRaw.filter(row=>row.productId===product.id).sort((a,b)=>a.order-b.order).map(row=>({id:row.id,url:media(row.data),order:row.order})),certificates:[]}));
const promotions = (await read('promotions')).map(p=>({...p,isActive:Boolean(p.isActive),image:imageMap[p.image?.split('/').pop()] || null,i18n:[]}));
const promotionTranslations = await read('promotion_i18n');
for(const p of promotions) p.i18n=promotionTranslations.filter(row => row.promotionId === p.id).map(row=>({...row,image:imageMap[row.image?.split('/').pop()] || null}));
const catalog=clean({categories,products,popular:await read('popular_products'),promotions});
await writeFile(resolve(target,'data/catalog.json'),JSON.stringify(catalog,null,2)+'\n');
// Original interface illustrations are copied; original company logos are replaced separately.
for(const directory of ['OtherPics','CatalogImage','brands','partners']) {
  await mkdir(resolve(target,'public',directory),{recursive:true});
  for(const file of await readdir(resolve(source,'public',directory))) {
    if(/logo|favicon|desktop\.ini/i.test(file)) continue;
    await cp(resolve(source,'public',directory,file),resolve(target,'public',directory,file));
  }
}
// The entrance photograph contains the former company banner. Use another original interior photograph.
await cp(resolve(source,'public/OtherPics/thirdphoto.jpg'),resolve(target,'public/OtherPics/secondpgoto.jpg'));
await cp(resolve(source,'public/partners/tashkent-city-mall.svg'),resolve(target,'public/partners/demo-city-mall.svg'));
await mkdir(resolve(target,'public/data'),{recursive:true});
await writeFile(resolve(target,'public/data/norms.json'), JSON.stringify(clean(JSON.parse(await readFile(resolve(source,'public/data/norms.json'),'utf8'))),null,2));
console.log(`Imported ${products.length} catalogue products, ${categories.length} categories, ${imagesRaw.length} product images.`);
