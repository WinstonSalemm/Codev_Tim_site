export const GA_ID='';export const YM_ID='';export const GTM_ID='';
export const isProd=process.env.NODE_ENV==='production';export const analyticsEnabled=false;
declare global {interface Window {dataLayer?:unknown[];gtag?:(...args:unknown[])=>void;ym?:(...args:unknown[])=>void;}}
export function gaPageView(_url:string){}
export function trackEvent(_name:string,_params:Record<string,unknown>={}){}
export function ymReachGoal(_goal:string,_params?:Record<string,unknown>){}
export function trackWebVitals(_metric:{id:string;name:string;label:string;value:number}){}
