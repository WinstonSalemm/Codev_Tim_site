import { redirect } from 'next/navigation';
import { getLocale } from '@/lib/api';
export default async function BlogPage() {
  const locale = await getLocale();
  redirect(`/fire-safety-store/${locale === 'uz' ? 'uz' : 'en'}/blog`);
}
