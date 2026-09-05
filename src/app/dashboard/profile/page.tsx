import { requireCurrentCompany } from "@/lib/current-company";
import { fromJsonArray } from "@/lib/json";
import { ProfileForm } from "./ProfileForm";

export default async function ProfilePage() {
  const company = await requireCurrentCompany();

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
    />
  );
}
