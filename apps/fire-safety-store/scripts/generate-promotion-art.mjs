import {mkdir,writeFile} from 'node:fs/promises';
import {resolve,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'../public/promotions');
await mkdir(root,{recursive:true});
const copy={
ru:{eyebrow:'СПЕЦИАЛЬНОЕ ПРЕДЛОЖЕНИЕ',title:['Купите 20 кронштейнов —','получите 1 в подарок'],subtitle:['Выгодное предложение для объектов,','монтажных бригад и регулярных закупок.'],cta:'Заказать по акции',buy:'ПОКУПАЕТЕ',gift:'ПОДАРОК',note:['Добавим один дополнительный','кронштейн к вашему заказу.'],footer:'ОБОРУДОВАНИЕ  ·  ПОДБОР  ·  ДОСТАВКА'},
en:{eyebrow:'SPECIAL OFFER',title:['Buy 20 brackets —','get 1 free'],subtitle:['A smart offer for facilities, installation teams','and regular purchases.'],cta:'Order this offer',buy:'YOU BUY',gift:'FREE',note:['One extra bracket included','with your order of twenty.'],footer:'EQUIPMENT  ·  SPECIALIST SELECTION  ·  DELIVERY'},
uz:{eyebrow:'MAXSUS TAKLIF',title:['20 ta kronshteyn oling —','1 tasi sovg‘a'],subtitle:['Obyektlar, montaj jamoalari va doimiy','xaridlar uchun foydali taklif.'],cta:'Taklifdan foydalanish',buy:'XARID',gift:'SOVG‘A',note:['Yigirmata buyurtmaga yana','bitta kronshteyn qo‘shamiz.'],footer:'USKUNALAR  ·  TANLASH  ·  YETKAZIB BERISH'}
};
for(const [locale,c] of Object.entries(copy)){
const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="520" viewBox="0 0 1200 520"><defs><linearGradient id="bg"><stop stop-color="#920700"/><stop offset="1" stop-color="#620400"/></linearGradient></defs><rect width="1200" height="520" rx="28" fill="url(#bg)"/><rect x="34" y="34" width="1132" height="452" rx="24" fill="none" stroke="#f6c46c" stroke-opacity=".22"/><g font-family="Arial,sans-serif" fill="white"><text x="72" y="76" font-size="20" font-weight="700" letter-spacing="3" fill="#f6c46c">FIRESAFE · ${c.eyebrow}</text>${c.title.map((text,i)=>`<text x="72" y="${155+i*58}" font-size="44" font-weight="800">${text}</text>`).join('')}${c.subtitle.map((text,i)=>`<text x="72" y="${283+i*30}" font-size="24" fill="#f7d9d2">${text}</text>`).join('')}<rect x="72" y="355" width="300" height="60" rx="14" fill="#f6c66f"/><text x="222" y="393" font-size="23" font-weight="700" text-anchor="middle" fill="#610500">${c.cta}</text><text x="72" y="461" font-size="17" font-weight="700" fill="#f6c66f">${c.footer}</text><rect x="750" y="110" width="378" height="305" rx="24" fill="#fff" fill-opacity=".08" stroke="#f6c46c" stroke-opacity=".4"/><text x="785" y="221" font-size="74" font-weight="800" fill="#ffdc91">20 + 1</text><text x="794" y="255" font-size="15" font-weight="700">${c.buy}</text><text x="1017" y="255" font-size="15" font-weight="700">${c.gift}</text>${c.note.map((text,i)=>`<text x="779" y="${323+i*30}" font-size="21" font-weight="600">${text}</text>`).join('')}</g></svg>`;
await writeFile(resolve(root,`offer-${locale}.svg`),svg);
}
console.log('Generated localized FireSafe promotion artwork.');
