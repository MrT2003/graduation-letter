export type Guest = {
  slug: string;
  name: string;
  role: "ban" | "anh";
};

// Add a guest here, then redeploy to create their invitation link.
export const guests: Guest[] = [
  {
    "slug": "thanh-thao",
    "name": "Thanh Thảo",
    "role": "ban"
  },
  {
    "slug": "dang-khoa",
    "name": "Đăng Khoa",
    "role": "ban"
  },
  {
    "slug": "nhat-thien",
    "name": "Nhật Thiên",
    "role": "ban"
  },
  {
    "slug": "khanh-ha",
    "name": "Khánh Hà",
    "role": "ban"
  },
  {
    "slug": "ngoc-tram",
    "name": "Ngọc Trâm",
    "role": "ban"
  },
  {
    "slug": "quyen-quyen",
    "name": "Quyên Quyên",
    "role": "ban"
  },
  {
    "slug": "anh-tin",
    "name": "Tín",
    "role": "anh"
  }
];
