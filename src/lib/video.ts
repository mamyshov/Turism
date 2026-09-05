/**
 * Normalizes a YouTube/Vimeo watch link into an embeddable iframe URL.
 * Returns null for anything else — we don't want to iframe arbitrary sites.
 */
export function toEmbedUrl(rawUrl: string): string | null {
  let u: URL;
  try {
    u = new URL(rawUrl.trim());
  } catch {
    return null;
  }

  const host = u.hostname.replace(/^www\./, "");

  if (host === "youtube.com" || host === "m.youtube.com") {
    if (u.pathname.startsWith("/embed/")) return u.toString();
    const id = u.searchParams.get("v");
    if (id) return `https://www.youtube.com/embed/${id}`;
    if (u.pathname.startsWith("/shorts/")) {
      const shortId = u.pathname.split("/")[2];
      if (shortId) return `https://www.youtube.com/embed/${shortId}`;
    }
    return null;
  }

  if (host === "youtu.be") {
    const id = u.pathname.slice(1);
    return id ? `https://www.youtube.com/embed/${id}` : null;
  }

  if (host === "vimeo.com") {
    const id = u.pathname.split("/").filter(Boolean).pop();
    return id && /^\d+$/.test(id) ? `https://player.vimeo.com/video/${id}` : null;
  }

  if (host === "player.vimeo.com") {
    return u.toString();
  }

  return null;
}
