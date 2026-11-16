import type { Metadata } from "next";
import type { Guest } from "./guests";

export const siteUrl = "https://www.minhtrieu-graduation.freeddns.org";
const defaultTitle = "A Little Invitation | Minh Triều";
const defaultDescription = "Một lời mời nhỏ từ Minh Triều. Hẹn bạn ngày 29/11/2026 để cùng chia sẻ niềm vui tốt nghiệp.";
const shareImage = {
  url: "/opengraph-image.png",
  width: 1200,
  height: 630,
  alt: "Minh Triều - Graduation invitation - 29 November 2026",
};

export function invitationMetadata(guest?: Guest): Metadata {
  const name = guest ? (guest.role === "anh" ? `anh ${guest.name}` : guest.name) : undefined;
  const title = name ? `Gửi ${name} | Lời mời tốt nghiệp` : defaultTitle;
  const description = name
    ? `${guest?.role === "anh" ? "Em" : "Mình"} mời ${name} đến chung vui trong ngày tốt nghiệp 29/11/2026. Chạm để mở lời mời từ Minh Triều.`
    : defaultDescription;
  const url = guest ? `${siteUrl}/moi/${guest.slug}` : siteUrl;

  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "vi_VN",
      siteName: "Minh Triều | Graduation Invitation",
      title,
      description,
      url,
      images: [shareImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [shareImage],
    },
  };
}
