export function Footer() {
  return (
    <footer className="border-t bg-white mt-16">
      <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-gray-500 flex flex-col sm:flex-row justify-between gap-4">
        <p>© {new Date().getFullYear()} KyrgyzTour Hub. Платформа для турфирм и гидов Кыргызстана.</p>
        <div className="flex gap-4">
          <a href="/about" className="hover:text-brand-700">О проекте</a>
          <a href="/contacts" className="hover:text-brand-700">Контакты</a>
        </div>
      </div>
    </footer>
  );
}
