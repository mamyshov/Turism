// Reference data for the platform. Kept as plain constants for the MVP;
// stage 3 (i18n) can turn these labels into translation keys without
// touching the stored `key` values used throughout the DB and URLs.

export const REGIONS = [
  { key: "issyk-kul", label: "Иссык-Куль" },
  { key: "osh", label: "Ош" },
  { key: "naryn", label: "Нарын" },
  { key: "jalal-abad", label: "Джалал-Абад" },
  { key: "batken", label: "Баткен" },
  { key: "talas", label: "Талас" },
  { key: "chuy", label: "Чуй" },
  { key: "bishkek", label: "Бишкек" },
] as const;

export const LANGUAGES = [
  { key: "ky", label: "Кыргызский" },
  { key: "ru", label: "Русский" },
  { key: "en", label: "Английский" },
  { key: "other", label: "Другой" },
] as const;

export const TOUR_CATEGORIES = [
  { key: "trekking", label: "Треккинг" },
  { key: "horse", label: "Конные туры" },
  { key: "cultural", label: "Культурный туризм" },
  { key: "gastro", label: "Гастротуризм" },
  { key: "adventure", label: "Экстрим/адвенчер" },
  { key: "eco", label: "Эко-туризм" },
  { key: "pilgrimage", label: "Паломнический" },
  { key: "winter", label: "Зимние туры" },
] as const;

export const TARIFFS = [
  {
    key: "BASIC",
    label: "Базовый",
    price: 0,
    period: "первые 6 мес. бесплатно",
    features: ["Профиль компании", "До 5 фото", "Без видео и PDF-гидов"],
  },
  {
    key: "STANDARD",
    label: "Стандарт",
    price: 500,
    period: "сом/мес",
    features: ["До 15 фото", "Видео-гиды", "PDF-гиды"],
  },
  {
    key: "PRO",
    label: "Про",
    price: 1500,
    period: "сом/мес",
    features: [
      "Приоритет в поиске",
      "Бейдж «Проверено»",
      "Аналитика просмотров",
    ],
  },
] as const;

export const COMPANY_TYPES = [
  { key: "LEGAL", label: "Турфирма (юрлицо)" },
  { key: "INDIVIDUAL", label: "Частный гид" },
] as const;

export const MAX_PHOTOS_BY_TARIFF: Record<string, number> = {
  BASIC: 5,
  STANDARD: 15,
  PRO: 15,
};

export const MAX_PHOTO_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB
export const MAX_VIDEO_SIZE_BYTES = 200 * 1024 * 1024; // 200 MB
export const MAX_PDF_SIZE_BYTES = 20 * 1024 * 1024; // 20 MB
export const MAX_VERIFICATION_DOC_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB

export const ALLOWED_PHOTO_TYPES = ["image/jpeg", "image/png", "image/webp"];
export const ALLOWED_VERIFICATION_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/png",
];

export function labelFor(
  list: readonly { key: string; label: string }[],
  key: string | null | undefined
): string {
  return list.find((item) => item.key === key)?.label ?? key ?? "";
}
