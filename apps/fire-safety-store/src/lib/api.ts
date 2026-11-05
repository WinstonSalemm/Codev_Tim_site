import {cookies,headers} from 'next/headers';
import {localApi} from './catalog';
export type Locale='ru'|'en'|'uz';
export async function getLocale():Promise<Locale>{const store=await cookies(); const h=await headers();const raw=h.get('x-demo-language')||store.get('firesafe-language')?.value||store.get('i18next')?.value||store.get('lang')?.value||'ru';return raw.startsWith('en')?'en':raw.startsWith('uz')?'uz':'ru';}
export async function getBaseUrl(){return 'http://127.0.0.1:3101/fire-safety-store';}
export async function safeJson<T=unknown>(response:Response):Promise<T>{return response.json() as Promise<T>;}
export async function fetchAPI<T=unknown>(path:string,_init?:RequestInit):Promise<T>{const data=localApi(path);if(data===null)throw new Error(`Unknown local catalogue endpoint: ${path}`);return data as T;}
