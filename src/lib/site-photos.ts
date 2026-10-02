import fs from "fs";
import path from "path";

// Optional branded photography: drop a file into public/images/kyrgyzstan/
// and it is picked up automatically; without it the UI keeps its brand
// gradient placeholder.
export function sitePhoto(name: "hero" | "cover"): string | null {
  for (const ext of ["jpg", "jpeg", "webp", "png"]) {
    const file = path.join(process.cwd(), "public", "images", "kyrgyzstan", `${name}.${ext}`);
    if (fs.existsSync(file)) return `/images/kyrgyzstan/${name}.${ext}`;
  }
  return null;
}
