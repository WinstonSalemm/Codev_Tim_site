import snapshot from '../../data/catalog.json';

export type Translation = {id?:string;locale:string;title:string;summary:string|null;description:string|null};
export type Category = {id:string;slug:string;name:string;image:string|null;imageData:Uint8Array|null;i18n:{locale:string;name:string}[];products?:DbProduct[]};
export type DbProduct = {id:string;slug:string;brand:string|null;price:number;stock:number;currency:string;specs:Record<string,unknown>|null;isActive:boolean;categoryId:string;createdAt:string;updatedAt:string;i18n:Translation[];images:{id:string;url:string;order:number}[];certificates:{certificate:{id:string;title:string;href:string}}[];category:Category|null};
export const categories:Category[] = snapshot.categories;
export const products:DbProduct[] = snapshot.products.map(p => ({...p,category:categories.find(c=>c.id===p.categoryId)||null})) as DbProduct[];
export const popular = snapshot.popular;
export const promotions = snapshot.promotions;
export const normLocale = (raw:string='ru') => raw.startsWith('en') ? 'eng' : raw.startsWith('uz') ? 'uzb' : 'ru';
export function localizeProduct(product:DbProduct, locale='ru') {
  const t=product.i18n.find(row=>row.locale===normLocale(locale)) || product.i18n[0];
  const cat=product.category;
  return {...product, ...t, id:product.id, images:product.images.map(image=>image.url),image:product.images[0]?.url || '/fire-safety-store/OtherPics/product2photo.jpg', category:cat ? {...cat,name:cat.i18n.find(row=>row.locale===normLocale(locale))?.name||cat.name} : null};
}
export function localizeCategory(category:Category, locale='ru') {
  return {...category,name:category.i18n.find(row=>row.locale===normLocale(locale))?.name||category.name,products:products.filter(p=>p.categoryId===category.id).map(p=>({id:p.id})),parentId:null,order:0,isActive:true,createdAt:'2026-01-01',updatedAt:'2026-01-01'};
}
export function localApi(path:string):unknown {
  const url=new URL(path,'http://storefront.local');
  const route=url.pathname.replace(/^\/fire-safety-store/,'').replace(/^\/api\/?/,'');
  const locale=url.searchParams.get('locale')||'ru';
  if(route==='health') return {app:'fire-safety-store',mode:'local-catalogue',products:products.length,categories:categories.length,revision:process.env.RAILWAY_GIT_COMMIT_SHA||'local'};
  if(route==='categories') return {categories:categories.map(c=>localizeCategory(c,locale))};
  if(route==='categories/tree') return categories.map(c=>localizeCategory(c,locale));
  if(route.startsWith('categories/')) {
    const slug=decodeURIComponent(route.split('/')[1]);
    const c=categories.find(c=>c.slug===slug||c.id===slug);
    return route.endsWith('/breadcrumbs') ? (c?[localizeCategory(c,locale)]:[]) : c ? {...localizeCategory(c,locale),category:localizeCategory(c,locale),products:products.filter(p=>p.categoryId===c.id).map(p=>localizeProduct(p,locale))} : null;
  }
  if(route==='products' || route==='products/featured' || route==='products/search' || route==='search' || route==='popular-products') {
    let rows=[...products];
    const category=url.searchParams.get('category');
    if(category) rows=rows.filter(p=>p.category?.slug===category||p.categoryId===category);
    const query=(url.searchParams.get('q')||url.searchParams.get('query')||'').toLocaleLowerCase();
    if(query) rows=rows.filter(p=>`${p.slug} ${p.i18n.map(t=>t.title).join(' ')}`.toLocaleLowerCase().includes(query));
    if(route==='products/featured') rows=rows.slice().reverse();
    const limit=Number(url.searchParams.get('limit')||url.searchParams.get('per')||500);
    const page=Number(url.searchParams.get('page')||1);
    const hydrated=rows.slice((page-1)*limit,page*limit).map(p=>localizeProduct(p,locale));
    return {success:true,products:hydrated,data:{products:hydrated,pagination:{total:rows.length,page,limit,pages:Math.ceil(rows.length/limit)},type:url.searchParams.get('type'),locale}};
  }
  if(route.startsWith('products/')) {
    const id=decodeURIComponent(route.slice('products/'.length));
    const p=products.find(p=>p.id===id||p.slug===id);
    return p ? {success:true,data:localizeProduct(p,locale),product:localizeProduct(p,locale)} : {success:false,data:null};
  }
  if(route==='certificates') return {certificates:demoCertificates,items:demoCertificates};
  if(route.startsWith('promotions')) return {success:true,promotions};
  return null;
}
export const demoCertificates=[{id:'demo-certificate',title:'FireSafe — демонстрационный сертификат оборудования',href:'/fire-safety-store/documents/demo-certificate.svg'}];
