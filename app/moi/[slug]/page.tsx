import { notFound } from "next/navigation";
import Invitation from "@/app/invitation";
import { guests } from "@/lib/guests";

export function generateStaticParams() {
  return guests.map(({ slug }) => ({ slug }));
}

export default async function GuestInvitation({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guest = guests.find((entry) => entry.slug === slug);
  if (!guest) notFound();
  return <Invitation guest={guest} />;
}
