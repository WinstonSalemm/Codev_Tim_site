import {demoCertificates} from './catalog';
export type CertificateItem={id:string;title:string;href:string};
export async function loadCertificates():Promise<CertificateItem[]>{return demoCertificates;}
