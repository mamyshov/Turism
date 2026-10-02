import { requireCurrentCompany } from "@/lib/current-company";
import { fromJsonArray } from "@/lib/json";
import { getLocale } from "@/lib/i18n/get-locale";
import { getDictionary } from "@/lib/i18n/dictionary";
import { localizedRegions, localizedLanguages, localizedCategories } from "@/lib/i18n/constant-labels";
import { ProfileForm } from "./ProfileForm";

export default async function ProfilePage() {
  const company = await requireCurrentCompany();
  const locale = getLocale();
  const dict = getDictionary(locale).dashboard.profile;

  return (
    <ProfileForm
      initial={{
        description: company.description ?? "",
        region: company.region ?? "",
        languages: fromJsonArray(company.languages),
        categories: fromJsonArray(company.categories),
        phone: company.phone ?? "",
        whatsapp: company.whatsapp ?? "",
        instagram: company.instagram ?? "",
        contactEmail: company.contactEmail ?? "",
      }}
      companySlug={company.slug}
      dict={dict}
      regions={localizedRegions(locale)}
      languages={localizedLanguages(locale)}
      categories={localizedCategories(locale)}
    />
  );
}
