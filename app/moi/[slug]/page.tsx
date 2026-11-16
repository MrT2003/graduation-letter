import type { Metadata } from "next";
import { invitationMetadata } from "@/lib/site-metadata";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import Invitation from "@/app/invitation";
import { guests } from "@/lib/guests";

type InvitationPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return guests.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: InvitationPageProps): Promise<Metadata> {
  const { slug } = await params;
  const guest = guests.find((entry) => entry.slug === slug);
  if (!guest) notFound();
  return invitationMetadata(guest);
}

async function PersonalizedInvitation({ params }: InvitationPageProps) {
  const { slug } = await params;
  const guest = guests.find((entry) => entry.slug === slug);
  if (!guest) notFound();
  return <Invitation guest={guest} />;
}

export default function GuestInvitation({ params }: InvitationPageProps) {
  return (
    <Suspense fallback={
      <main className="invitation-loading">
        <p className="eyebrow" lang="en">A LITTLE INVITATION</p>
        <p role="status">Đang chuẩn bị lời mời dành riêng cho bạn…</p>
      </main>
    }>
      <PersonalizedInvitation params={params} />
    </Suspense>
  );
}
