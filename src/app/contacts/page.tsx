export const metadata = { title: "Контакты" };

export default function ContactsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14">
      <h1 className="text-3xl font-bold mb-6">Контакты</h1>
      <ul className="space-y-2 text-gray-700">
        <li>✉️ Email: info@kyrgyztourhub.kg</li>
        <li>📞 Телефон: +996 700 000 000</li>
        <li>📍 Бишкек, Кыргызстан</li>
      </ul>
    </div>
  );
}
