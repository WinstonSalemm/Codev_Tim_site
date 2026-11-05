// Read-only catalogue adapter: retains the source frontend's query shape without a database.
import {categories, products, popular, promotions, normLocale, type DbProduct, type Category} from './catalog';
type Query = Record<string,any>;
function withLocale(p:DbProduct,q:Query={}):DbProduct {
  const where=q.include?.i18n?.where||q.select?.i18n?.where;
  const locale=typeof where?.locale==='string' ? normLocale(where.locale):null;
  return {...p,i18n:locale?p.i18n.filter(t=>t.locale===locale):p.i18n};
}
function findProducts(q:Query={}):DbProduct[] {
  const w=q.where||{};
  let result=products.filter(p=>(!w.id||p.id===w.id)&&(!w.slug||typeof w.slug!=='string'||p.slug===w.slug)&&(!w.slug?.not||p.slug!==w.slug.not)&&(!w.category?.slug||p.category?.slug===w.category.slug)&&(!w.categoryId||p.categoryId===w.categoryId));
  if(q.orderBy?.updatedAt==='desc'||q.orderBy?.createdAt==='desc') result=result.slice().reverse();
  return result.slice(q.skip||0,q.take ? (q.skip||0)+q.take:undefined).map(p=>withLocale(p,q));
}
function findCategories(q:Query={}):Category[] {
  return categories.filter(c=>(!q.where?.slug||c.slug===q.where.slug)&&(!q.where?.id||c.id===q.where.id)&&(!q.where?.products?.some||products.some(p=>p.categoryId===c.id))).map(c=>({...c,products:products.filter(p=>p.categoryId===c.id)}));
}
export const prisma={
  product:{findMany:async(q:Query={})=>findProducts(q),findUnique:async(q:Query={})=>findProducts(q)[0]||null,findFirst:async(q:Query={})=>findProducts(q)[0]||null,count:async(q:Query={})=>findProducts(q).length},
  category:{findMany:async(q:Query={})=>findCategories(q),findUnique:async(q:Query={})=>findCategories(q)[0]||null},
  popularProduct:{findMany:async(q:Query={})=>popular.map(pp=>({...pp,product:withLocale(products.find(p=>p.id===pp.productId)!,q.include?.product||{})})).filter(pp=>pp.product).slice(0,q.take||6)},
  promotion:{findMany:async(q:Query={})=>promotions.filter(p=>p.isActive).slice(0,q.take||100).map(p=>({...p,startsAt:p.startsAt?new Date(p.startsAt):null,endsAt:p.endsAt?new Date(p.endsAt):null}))}
};
