import {NextRequest,NextResponse} from 'next/server';
import {localApi,products} from '@/lib/catalog';
export const dynamic='force-dynamic';
export async function GET(request:NextRequest){const result=localApi(request.url);return NextResponse.json(result??{success:false,message:'Not found'},{status:result===null?404:200});}
export async function POST(request:NextRequest){
 const path=new URL(request.url).pathname;
 if(path.endsWith('/orders')){
   const payload=await request.json().catch(()=>({}));
   const items=Array.isArray(payload.items)?payload.items:[];
   const total=items.reduce((sum:number,item:{productId:string;quantity:number})=>sum+(products.find(p=>p.id===item.productId)?.price||0)*Math.min(999,Math.max(0,Number(item.quantity)||0)),0);
   return NextResponse.json({success:true,demo:true,data:{id:`DEMO-${Date.now().toString(36).toUpperCase()}`,total},message:'Демонстрация: заказ не отправлен и не сохранён.'});
 }
 if(path.endsWith('/register')) return NextResponse.json({success:true,demo:true,message:'Демо-профиль создан только в текущем браузере.'});
 return NextResponse.json({success:true,demo:true,message:'Демонстрация: данные не отправлены.'});
}
