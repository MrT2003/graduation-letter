import type { Guest } from "./guests";

export function getInvitationCopy(guest?: Guest) {
  const recipient = guest?.role === "anh" ? "anh" : "bạn";
  const recipientCapital = guest?.role === "anh" ? "Anh" : "Bạn";
  const self = guest?.role === "anh" ? "em" : "mình";
  const selfCapital = guest?.role === "anh" ? "Em" : "Mình";
  const addressee = guest ? (guest.role === "anh" ? `anh ${guest.name}` : guest.name) : undefined;

  return {
    greeting: addressee ? `Gửi ${addressee},` : "Bạn thân mến,",
    envelopeNote: addressee ? `Gửi ${addressee}, với tất cả trân quý.` : "Sẽ thật đẹp khi có bạn ở đây.",
    introduction: `Và ${self} có một lời mời nhỏ dành riêng cho ${recipient}.`,
    openedHint: `Lời mời của ${recipient} ở ngay bên dưới ↓`,
    story: `Những ngày đi học đã để lại thật nhiều điều đáng nhớ. Giờ đây, ${self} sắp bước lên sân khấu, nhận tấm bằng và bắt đầu một hành trình mới.`,
    invitation: `${selfCapital} mong ${recipient} sẽ có mặt để cùng cười, cùng chụp một tấm ảnh và giữ lại khoảnh khắc này. Sự hiện diện của ${recipient} sẽ khiến ngày hôm ấy đặc biệt hơn rất nhiều.`,
    timeNote: `${recipientCapital} ghé khung giờ nào thuận tiện nhé.`,
    closing: `Hẹn gặp ${recipient} ở chương mới này ♡`,
  };
}
