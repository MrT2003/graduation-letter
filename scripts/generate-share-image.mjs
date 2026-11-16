import sharp from "sharp";
import path from "node:path";
import { fileURLToPath } from "node:url";
import fs from "node:fs/promises";
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const normal = path.join(root, "public/fonts/NotoSerif-Regular.ttf");
const italic = path.join(root, "public/fonts/NotoSerif-Italic.ttf");

async function textLayer(text, size, left, top, color = "#343d33", isItalic = false) {
  const input = await sharp({ text: {
    text: `<span foreground="${color}">${text}</span>`,
    font: `Noto Serif ${isItalic ? "Italic " : ""}${size}`,
    fontfile: isItalic ? italic : normal,
    rgba: true,
    dpi: 72,
  }}).png().toBuffer();
  return { input, left, top };
}

async function main() {
  const background = Buffer.from(`<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs><radialGradient id="bg"><stop stop-color="#fffcf5"/><stop offset="1" stop-color="#f2eddf"/></radialGradient>
  <linearGradient id="paper" x2="1" y2="1"><stop stop-color="#eadebf"/><stop offset="1" stop-color="#d5c299"/></linearGradient>
  <radialGradient id="wax"><stop stop-color="#b06a54"/><stop offset="1" stop-color="#77392f"/></radialGradient></defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect x="28" y="28" width="1144" height="574" rx="3" fill="none" stroke="#d8d0bb"/>
  <path d="M72 116H1128M72 514H1128" stroke="#ddd6c4"/>
  <g transform="rotate(-6 935 330)">
  <ellipse cx="935" cy="470" rx="182" ry="23" fill="#625137" opacity=".08"/>
  <rect x="765" y="290" width="340" height="205" rx="4" fill="#bda980"/>
  <rect x="786" y="180" width="298" height="268" fill="#fffcf3" stroke="#ddd2b7"/>
  <rect x="795" y="189" width="280" height="250" fill="none" stroke="#e6ddc7"/>
  <path d="M930 215l5 10 10 5-10 5-5 10-5-10-10-5 10-5z" fill="#939b72"/>
  <text x="935" y="280" text-anchor="middle" font-family="serif" font-size="28" fill="#343d33">My graduation</text>
  <path d="M765 290L935 402 1105 290V495H765Z" fill="url(#paper)"/>
  <path d="M765 495L935 385 1105 495" fill="none" stroke="#bfa97e" opacity=".5"/>
  <circle cx="935" cy="402" r="29" fill="url(#wax)" stroke="#a56551" stroke-width="3"/>
  <circle cx="935" cy="402" r="23" fill="none" stroke="#6f352d"/>
  <text x="935" y="412" text-anchor="middle" font-family="serif" font-size="30" font-style="italic" fill="#ddb297">T</text>
  </g></svg>`);
  const layers = await Promise.all([
    textLayer("A LITTLE MILESTONE / GRADUATION INVITATION", 17, 72, 73, "#757e61"),
    textLayer("A day to remember.", 53, 72, 167),
    textLayer("Made better with you.", 49, 72, 245, "#596347", true),
    textLayer("Một lời mời nhỏ, dành riêng cho bạn.", 20, 76, 349, "#747869"),
    textLayer("Chạm để mở thư và cùng chia sẻ ngày vui.", 20, 76, 385, "#747869"),
    textLayer("Minh Triều", 27, 76, 546),
    textLayer("29 / 11 / 2026", 22, 895, 548, "#596347"),
  ]);
  await sharp(background).composite(layers).png().toFile(path.join(root, "app/opengraph-image.png"));
  await fs.writeFile(path.join(root, "app/opengraph-image.alt.txt"), "Minh Tri\u1ec1u - Graduation invitation - 29 November 2026", "utf8");
  console.log("Generated 1200 x 630 invitation share image.");
}
main().catch(error => { console.error(error); process.exitCode = 1; });
