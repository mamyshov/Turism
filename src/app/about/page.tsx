import { getLocale } from "@/lib/i18n/get-locale";
import { getDictionary } from "@/lib/i18n/dictionary";

export const metadata = { title: "About" };

export default function AboutPage() {
  const dict = getDictionary(getLocale()).about;

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <h1 className="mb-6 text-3xl font-bold text-ink sm:text-4xl">{dict.title}</h1>
      <p className="text-lg leading-relaxed text-ink-secondary">{dict.body1}</p>
      <p className="mt-4 leading-relaxed text-ink-secondary">{dict.body2}</p>
    </div>
  );
}
