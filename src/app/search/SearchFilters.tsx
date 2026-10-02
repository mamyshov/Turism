import { Select } from "@/components/ui/Input";
import { Button, LinkButton } from "@/components/ui/Button";

export function SearchFilters({
  dict,
  regions,
  categories,
  languages,
  searchParams,
  idPrefix,
}: {
  dict: {
    searchLabel: string;
    searchPlaceholder: string;
    region: string;
    category: string;
    language: string;
    price: string;
    from: string;
    to: string;
    apply: string;
    reset: string;
    all: string;
  };
  regions: { key: string; label: string }[];
  categories: { key: string; label: string }[];
  languages: { key: string; label: string }[];
  searchParams: {
    q?: string;
    region?: string;
    category?: string;
    language?: string;
    minPrice?: string;
    maxPrice?: string;
  };
  idPrefix: string;
}) {
  return (
    <form action="/search" className="space-y-5">
      <div>
        <label htmlFor={`${idPrefix}-q`} className="mb-1.5 block text-sm font-medium text-ink">
          {dict.searchLabel}
        </label>
        <input
          id={`${idPrefix}-q`}
          name="q"
          defaultValue={searchParams.q}
          placeholder={dict.searchPlaceholder}
          className="focus-ring w-full rounded-md border border-line px-3 py-2 text-sm hover:border-ink-secondary/60"
        />
      </div>

      <Select id={`${idPrefix}-region`} label={dict.region} name="region" defaultValue={searchParams.region ?? ""}>
        <option value="">{dict.all}</option>
        {regions.map((o) => (
          <option key={o.key} value={o.key}>
            {o.label}
          </option>
        ))}
      </Select>

      <Select id={`${idPrefix}-category`} label={dict.category} name="category" defaultValue={searchParams.category ?? ""}>
        <option value="">{dict.all}</option>
        {categories.map((o) => (
          <option key={o.key} value={o.key}>
            {o.label}
          </option>
        ))}
      </Select>

      <Select id={`${idPrefix}-language`} label={dict.language} name="language" defaultValue={searchParams.language ?? ""}>
        <option value="">{dict.all}</option>
        {languages.map((o) => (
          <option key={o.key} value={o.key}>
            {o.label}
          </option>
        ))}
      </Select>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-ink">{dict.price}</label>
        <div className="flex gap-2">
          <input
            name="minPrice"
            type="number"
            min={0}
            placeholder={dict.from}
            defaultValue={searchParams.minPrice}
            className="focus-ring w-1/2 rounded-md border border-line px-3 py-2 text-sm hover:border-ink-secondary/60"
          />
          <input
            name="maxPrice"
            type="number"
            min={0}
            placeholder={dict.to}
            defaultValue={searchParams.maxPrice}
            className="focus-ring w-1/2 rounded-md border border-line px-3 py-2 text-sm hover:border-ink-secondary/60"
          />
        </div>
      </div>

      <Button type="submit" fullWidth>
        {dict.apply}
      </Button>
      <LinkButton href="/search" variant="ghost" size="sm" fullWidth>
        {dict.reset}
      </LinkButton>
    </form>
  );
}
