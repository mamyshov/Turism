import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const adminPassword = await bcrypt.hash("admin12345", 10);
  await prisma.user.upsert({
    where: { email: "admin@kyrgyztourhub.kg" },
    update: {},
    create: {
      email: "admin@kyrgyztourhub.kg",
      password: adminPassword,
      role: "ADMIN",
    },
  });
  console.log("✔ Admin user: admin@kyrgyztourhub.kg / admin12345");

  const demoCompanies = [
    {
      email: "issykkul-trek@example.com",
      name: "Issyk-Kul Trekking Guides",
      slug: "issyk-kul-trekking-guides",
      photoSet: "issyk-kul",
      type: "LEGAL" as const,
      region: "issyk-kul",
      categories: ["trekking", "eco"],
      languages: ["ru", "en"],
      description:
        "Профессиональные треккинг-туры вокруг Иссык-Куля: горные озёра, альпийские луга и ночёвки в юртах.",
      tariff: "PRO" as const,
      tours: [
        { title: "Треккинг к озеру Ала-Кёль", price: 8500, durationDays: 3, maxPeople: 10 },
      ],
      videos: [
        { type: "EMBED", url: "https://www.youtube.com/embed/dQw4w9WgXcQ", title: "Обзор маршрута Ала-Кёль" },
      ],
      pdfGuides: [] as { title: string; url: string }[],
      reviews: [
        { authorName: "Айгуль", authorEmail: "aigul@example.com", rating: 5, text: "Отличный тур, спасибо гиду!" },
        { authorName: "John", authorEmail: "john@example.com", rating: 4, text: "Great scenery, well organized." },
      ],
    },
    {
      email: "osh-culture@example.com",
      name: "Osh Culture Tours",
      slug: "osh-culture-tours",
      photoSet: "osh",
      type: "LEGAL" as const,
      region: "osh",
      categories: ["cultural", "gastro"],
      languages: ["ru", "ky"],
      description: "Культурные и гастрономические туры по Ошу и Ферганской долине.",
      tariff: "STANDARD" as const,
      tours: [
        { title: "Гастротур по Ошскому базару", price: 2500, durationHours: 4, maxPeople: 15 },
      ],
      videos: [] as { type: string; url: string; title: string }[],
      pdfGuides: [] as { title: string; url: string }[],
      reviews: [
        { authorName: "Nurlan", authorEmail: "nurlan@example.com", rating: 5, text: "Очень вкусно и интересно!" },
      ],
    },
    {
      email: "naryn-horse@example.com",
      name: "Naryn Horse Adventures",
      slug: "naryn-horse-adventures",
      photoSet: "naryn",
      type: "INDIVIDUAL" as const,
      region: "naryn",
      categories: ["horse", "adventure"],
      languages: ["ky", "ru", "en"],
      description: "Конные туры по нетронутым долинам Нарынской области с местным гидом.",
      tariff: "BASIC" as const,
      tours: [
        { title: "Конный тур к Сон-Кёлю", price: 12000, durationDays: 5, maxPeople: 6 },
      ],
      videos: [] as { type: string; url: string; title: string }[],
      pdfGuides: [] as { title: string; url: string }[],
      reviews: [] as { authorName: string; authorEmail: string; rating: number; text: string }[],
    },
    {
      email: "ala-archa@example.com",
      name: "Ala-Archa Alpine Club",
      slug: "ala-archa-alpine-club",
      type: "LEGAL" as const,
      region: "chuy",
      categories: ["trekking", "adventure"],
      languages: ["ru", "en"],
      description:
        "Однодневные походы и восхождения в национальном парке Ала-Арча в часе езды от Бишкека. Сертифицированные горные гиды, снаряжение включено.",
      tariff: "PRO" as const,
      photoSet: "ala-archa",
      tours: [
        { title: "Восхождение на пик Корона", price: 9500, durationDays: 2, maxPeople: 8, description: "Ночёвка в приюте, выход на рассвете, подъём по леднику с гидом.", included: "Гид, снаряжение, приют, питание", excluded: "Страховка" },
        { title: "Однодневный трек к водопаду Ак-Сай", price: 3200, durationHours: 8, maxPeople: 12, description: "Лёгкий маршрут по ущелью с видами на ледники.", included: "Гид, трансфер из Бишкека, обед", excluded: "Личные расходы" },
      ],
      videos: [] as { type: string; url: string; title: string }[],
      pdfGuides: [] as { title: string; url: string }[],
      reviews: [
        { authorName: "Marta", authorEmail: "marta@example.com", rating: 5, text: "Best mountain day trip from Bishkek, guides were superb." },
        { authorName: "Эрлан", authorEmail: "erlan@example.com", rating: 5, text: "Отличная организация и безопасность." },
        { authorName: "Tom", authorEmail: "tom@example.com", rating: 4, text: "Great views, a bit cold at the top!" },
      ],
    },
    {
      email: "song-kol@example.com",
      name: "Song-Kol Yurt Camp",
      slug: "song-kol-yurt-camp",
      type: "LEGAL" as const,
      region: "naryn",
      categories: ["eco", "cultural", "horse"],
      languages: ["ky", "ru", "en"],
      description:
        "Юртовый лагерь на берегу высокогорного озера Сон-Кёль: кумыс, национальные игры, верховая езда и звёздное небо.",
      tariff: "STANDARD" as const,
      photoSet: "song-kol",
      tours: [
        { title: "Три дня на Сон-Кёле", price: 11000, durationDays: 3, maxPeople: 10, description: "Ночёвки в юртах, прогулки верхом, обед у пастухов.", included: "Трансфер, юрта, трёхразовое питание", excluded: "Алкоголь, сувениры" },
        { title: "Закат и ужин у озера", price: 2800, durationHours: 5, maxPeople: 16, description: "Короткая поездка на закате с традиционным ужином.", included: "Ужин, гид", excluded: "Трансфер из Бишкека" },
      ],
      videos: [] as { type: string; url: string; title: string }[],
      pdfGuides: [] as { title: string; url: string }[],
      reviews: [
        { authorName: "Анна", authorEmail: "anna@example.com", rating: 5, text: "Незабываемо! Звёзды такие, что дух захватывает." },
        { authorName: "Kenji", authorEmail: "kenji@example.com", rating: 5, text: "Authentic and very warm hospitality." },
      ],
    },
    {
      email: "skazka@example.com",
      name: "Skazka Canyon Explorers",
      slug: "skazka-canyon-explorers",
      type: "INDIVIDUAL" as const,
      region: "issyk-kul",
      categories: ["adventure", "eco"],
      languages: ["ru", "en"],
      description:
        "Фототуры и экспедиции по красным каньонам южного берега Иссык-Куля: Сказка, Джеты-Огуз, Конорчек.",
      tariff: "PRO" as const,
      photoSet: "skazka",
      tours: [
        { title: "Каньон Сказка и Джеты-Огуз", price: 7800, durationDays: 2, maxPeople: 7, description: "Красные скалы, закат в каньоне, ночёвка на берегу озера.", included: "Транспорт, гид, ночёвка", excluded: "Питание" },
        { title: "Фотоэкспедиция по каньонам", price: 4500, durationDays: 1, maxPeople: 6, description: "Лучшие точки для съёмки на рассвете.", included: "Гид-фотограф, транспорт", excluded: "Обед" },
      ],
      videos: [] as { type: string; url: string; title: string }[],
      pdfGuides: [] as { title: string; url: string }[],
      reviews: [
        { authorName: "Лена", authorEmail: "lena@example.com", rating: 5, text: "Такие виды, словно на другой планете." },
      ],
    },
    {
      email: "karakol-winter@example.com",
      name: "Karakol Winter Sports",
      slug: "karakol-winter-sports",
      type: "LEGAL" as const,
      region: "issyk-kul",
      categories: ["winter", "adventure"],
      languages: ["ru", "en", "ky"],
      description:
        "Зимние туры в Караколе: ски-туры, фрирайд, снегоступы и горячие источники после катания.",
      tariff: "STANDARD" as const,
      photoSet: "karakol",
      tours: [
        { title: "Ски-тур в Караколе", price: 14500, durationDays: 3, maxPeople: 8, description: "Три дня катания на склонах и в бэккантри.", included: "Гид, ски-пасс, проживание", excluded: "Прокат экипировки" },
        { title: "Снегоступы и термальные источники", price: 3800, durationDays: 1, maxPeople: 12, description: "Прогулка по зимнему лесу и отдых в термах.", included: "Снегоступы, гид, термы", excluded: "Обед" },
      ],
      videos: [] as { type: string; url: string; title: string }[],
      pdfGuides: [] as { title: string; url: string }[],
      reviews: [
        { authorName: "Игорь", authorEmail: "igor@example.com", rating: 4, text: "Снег отличный, организация на уровне." },
        { authorName: "Sophie", authorEmail: "sophie@example.com", rating: 5, text: "Loved the hot springs after skiing." },
      ],
    },
    {
      email: "arslanbob@example.com",
      name: "Arslanbob Walnut Forest Tours",
      slug: "arslanbob-walnut-forest-tours",
      type: "INDIVIDUAL" as const,
      region: "jalal-abad",
      categories: ["eco", "gastro", "cultural"],
      languages: ["ky", "ru"],
      description:
        "Прогулки по крупнейшему ореховому лесу мира, водопады Арслан-Боба и домашняя кухня в гостевых домах.",
      tariff: "BASIC" as const,
      photoSet: "arslanbob",
      tours: [
        { title: "Арслан-Боб: ореховый лес и водопады", price: 6200, durationDays: 2, maxPeople: 10, description: "Пешие маршруты, водопады, ужин в семье.", included: "Гид, проживание, ужин", excluded: "Транспорт до Арслан-Боба" },
      ],
      videos: [] as { type: string; url: string; title: string }[],
      pdfGuides: [] as { title: string; url: string }[],
      reviews: [] as { authorName: string; authorEmail: string; rating: number; text: string }[],
    },
  ];

  for (const c of demoCompanies) {
    const password = await bcrypt.hash("demo12345", 10);
    const user = await prisma.user.upsert({
      where: { email: c.email },
      update: {},
      create: { email: c.email, password, role: "COMPANY" },
    });

    const company = await prisma.company.upsert({
      where: { userId: user.id },
      update: {},
      create: {
        userId: user.id,
        name: c.name,
        slug: c.slug,
        type: c.type,
        region: c.region,
        description: c.description,
        categories: JSON.stringify(c.categories),
        languages: JSON.stringify(c.languages),
        phone: "+996700000000",
        whatsapp: "996700000000",
        contactEmail: c.email,
        verificationStatus: "APPROVED",
        tariff: c.tariff,
        tours: { create: c.tours },
        videos: { create: c.videos },
        pdfGuides: { create: c.pdfGuides },
        reviews: { create: c.reviews },
      },
    });

    const dbTours = await prisma.tour.findMany({ where: { companyId: company.id }, include: { _count: { select: { photos: true } } } });
    for (const [idx, def] of c.tours.entries()) {
      const dbTour = dbTours.find((t) => t.title === def.title);
      if (dbTour && dbTour._count.photos === 0) {
        await prisma.tourPhoto.createMany({
          data: [1, 2].map((n, i) => ({
            tourId: dbTour.id,
            url: `/images/demo/t-${c.photoSet}-${idx}-${n}.jpg`,
            order: i,
          })),
        });
      }
    }

    const existing = await prisma.photo.count({ where: { companyId: company.id } });
    if (existing === 0) {
      await prisma.photo.createMany({
        data: [1, 2, 3].map((n, i) => ({
          companyId: company.id,
          url: `/images/demo/${c.photoSet}-${n}.jpg`,
          order: i,
        })),
      });
    }
  }

  console.log("✔ Seeded 8 demo companies with photos (password: demo12345)");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
