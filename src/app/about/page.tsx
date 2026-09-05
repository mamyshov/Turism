export const metadata = { title: "О проекте" };

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14">
      <h1 className="text-3xl font-bold mb-6">О проекте</h1>
      <p className="text-gray-700 leading-relaxed">
        KyrgyzTour Hub — платформа, где турфирмы и частные гиды Кыргызстана
        могут создать профиль с фото, видео и PDF-гидами, а туристы —
        находить их через поиск и фильтры, изучать медиа-контент и
        связываться напрямую по WhatsApp, телефону или email.
      </p>
      <p className="mt-4 text-gray-700 leading-relaxed">
        Мы верифицируем каждую турфирму и гида перед публикацией профиля,
        чтобы турист мог доверять информации в каталоге.
      </p>
    </div>
  );
}
