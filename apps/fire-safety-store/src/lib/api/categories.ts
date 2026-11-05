import {categories,localizeCategory} from '../catalog';
export interface Category {id:string;slug:string;name:string;description?:string;image?:string;imageData?:string;parentId:string|null;order:number;isActive:boolean;createdAt:string;updatedAt:string;translations?:Record<string,{name:string;description?:string;slug:string}>;}
export async function getAllCategories(locale='ru'):Promise<Category[]>{return categories.map(c=>({...localizeCategory(c,locale),image:c.image||undefined,imageData:undefined}));}
export async function getCategoryBySlug(slug:string):Promise<Category|null>{return (await getAllCategories()).find(c=>c.slug===slug)||null;}
export async function getCategoriesByParent(_parentId:string|null){return getAllCategories();}
export async function getCategoryTree(){return getAllCategories();}
export async function getCategoryBreadcrumbs(slug:string){const c=await getCategoryBySlug(slug);return c?[c]:[];}
