import { notFound } from "next/navigation";

type CatchAllPageProps = {
  params: Promise<{ locale: string; rest: string[] }>;
};

export default async function CatchAllPage({ params }: CatchAllPageProps) {
  await params;
  notFound();
}
