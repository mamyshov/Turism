import { getLocale } from "@/lib/i18n/get-locale";
import { getDictionary } from "@/lib/i18n/dictionary";

export const metadata = { title: "About" };

export default function AboutPage() {
  const dict = getDictionary(getLocale()).about;

  return (
    <div className="mx-auto max-w-3xl px-4 py-14">
      <h1 className="text-3xl font-bold mb-6">{dict.title}</h1>
      <p className="text-gray-700 leading-relaxed">{dict.body1}</p>
      <p className="mt-4 text-gray-700 leading-relaxed">{dict.body2}</p>
    </div>
  );
}
