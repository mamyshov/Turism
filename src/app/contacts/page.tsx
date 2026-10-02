import { Mail, Phone, MapPin } from "lucide-react";
import { getLocale } from "@/lib/i18n/get-locale";
import { getDictionary } from "@/lib/i18n/dictionary";

export const metadata = { title: "Contacts" };

export default function ContactsPage() {
  const dict = getDictionary(getLocale()).auth;
  const items = [
    { icon: Mail, label: "Email", value: "info@kyrgyztourhub.kg", href: "mailto:info@kyrgyztourhub.kg" },
    { icon: Phone, label: dict.phone, value: "+996 700 000 000", href: "tel:+996700000000" },
    { icon: MapPin, label: dict.contactsTitle, value: dict.contactsAddress },
  ];

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <h1 className="mb-8 text-3xl font-bold text-ink sm:text-4xl">{dict.contactsTitle}</h1>
      <ul className="grid gap-4 sm:grid-cols-3">
        {items.map(({ icon: Icon, label, value, href }) => (
          <li key={label} className="rounded-card border border-line bg-white p-5 shadow-card">
            <span className="flex size-10 items-center justify-center rounded-full bg-brand-50 text-brand-700">
              <Icon className="size-5" aria-hidden />
            </span>
            <p className="mt-3 text-sm text-ink-muted">{label}</p>
            {href ? (
              <a href={href} className="focus-ring text-balance-wrap rounded font-medium text-ink hover:text-brand-700">
                {value}
              </a>
            ) : (
              <p className="font-medium text-ink">{value}</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
