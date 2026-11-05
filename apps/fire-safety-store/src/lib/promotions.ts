import {promotions,normLocale} from './catalog';
import type {PromotionCard} from '@/types/promotion';
export type AppLocale='ru'|'en'|'uz';
export function isPromotionActiveNow(p:{isActive:boolean;startsAt:Date|null;endsAt:Date|null;now?:Date}){return p.isActive;}
export async function getActivePromotions(locale:AppLocale,opts?:{limit?:number}):Promise<PromotionCard[]>{return promotions.filter(p=>p.isActive).slice(0,opts?.limit||100).map(p=>{const t=p.i18n.find(t=>t.locale===normLocale(locale))||p.i18n[0];return {id:p.id,slug:p.slug,title:t?.title||p.slug,summary:t?.summary||'',description:t?.description||null,imageUrl:t?.image||p.image,href:p.ctaUrl,startsAt:p.startsAt,endsAt:p.endsAt};});}
