import { getLocale } from "@/lib/i18n/get-locale";
import { getDictionary } from "@/lib/i18n/dictionary";

export const metadata = { title: "Contacts" };

export default function ContactsPage() {
  const dict = getDictionary(getLocale()).contacts;

  return (
    <div className="mx-auto max-w-3xl px-4 py-14">
      <h1 className="text-3xl font-bold mb-6">{dict.title}</h1>
      <ul className="space-y-2 text-gray-700">
        <li>✉️ Email: info@kyrgyztourhub.kg</li>
        <li>📞 +996 700 000 000</li>
        <li>📍 Бишкек, Кыргызстан</li>
      </ul>
    </div>
  );
}
