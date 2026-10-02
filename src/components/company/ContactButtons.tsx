import { MessageCircle, Phone, Mail, Camera } from "lucide-react";

type Contacts = {
  phone: string | null;
  whatsapp: string | null;
  instagram: string | null;
  contactEmail: string | null;
};
type ContactDict = { whatsapp: string; call: string; email: string; instagram: string };

const base =
  "focus-ring inline-flex h-10 items-center justify-center gap-2 rounded-md px-4 text-sm font-medium transition-colors";
const outline = `${base} border border-line bg-white text-ink hover:bg-gray-50 active:bg-gray-100`;

export function ContactButtons({ company, dict }: { company: Contacts; dict: ContactDict }) {
  return (
    <div className="flex flex-wrap gap-2">
      {company.whatsapp && (
        <a
          href={`https://wa.me/${company.whatsapp.replace(/\D/g, "")}`}
          target="_blank"
          rel="noopener noreferrer"
          className={`${base} bg-brand-600 text-white hover:bg-brand-700 active:bg-brand-800`}
        >
          <MessageCircle className="size-4" aria-hidden />
          {dict.whatsapp}
        </a>
      )}
      {company.phone && (
        <a href={`tel:${company.phone}`} className={outline}>
          <Phone className="size-4" aria-hidden />
          {dict.call}
        </a>
      )}
      {company.contactEmail && (
        <a href={`mailto:${company.contactEmail}`} className={outline}>
          <Mail className="size-4" aria-hidden />
          {dict.email}
        </a>
      )}
      {company.instagram && (
        <a
          href={`https://instagram.com/${company.instagram.replace("@", "")}`}
          target="_blank"
          rel="noopener noreferrer"
          className={outline}
        >
          <Camera className="size-4" aria-hidden />
          {dict.instagram}
        </a>
      )}
    </div>
  );
}

// Mobile-only sticky bar with the two primary CTAs (spec 7.6).
export function MobileContactBar({ company, dict }: { company: Contacts; dict: ContactDict }) {
  if (!company.whatsapp && !company.phone) return null;
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 flex gap-2 border-t border-line bg-white p-3 md:hidden">
      {company.whatsapp && (
        <a
          href={`https://wa.me/${company.whatsapp.replace(/\D/g, "")}`}
          target="_blank"
          rel="noopener noreferrer"
          className={`${base} h-11 flex-1 bg-brand-600 text-white active:bg-brand-800`}
        >
          <MessageCircle className="size-4" aria-hidden />
          {dict.whatsapp}
        </a>
      )}
      {company.phone && (
        <a href={`tel:${company.phone}`} className={`${outline} h-11 flex-1`}>
          <Phone className="size-4" aria-hidden />
          {dict.call}
        </a>
      )}
    </div>
  );
}
