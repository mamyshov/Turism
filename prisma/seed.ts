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
  ];

  for (const c of demoCompanies) {
    const password = await bcrypt.hash("demo12345", 10);
    const user = await prisma.user.upsert({
      where: { email: c.email },
      update: {},
      create: { email: c.email, password, role: "COMPANY" },
    });

    await prisma.company.upsert({
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
  }

  console.log("✔ Seeded 3 demo companies (password: demo12345)");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
