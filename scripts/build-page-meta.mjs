import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { meta, siteUrl } from "../app/src/data/site-meta.js";

const dist = path.resolve("dist");
const template = await readFile(path.join(dist, "index.html"), "utf8");
const marker = /<!-- site-meta:start -->[\s\S]*?<!-- site-meta:end -->/;
if (!marker.test(template)) throw new Error("The HTML metadata marker is missing.");
const escape = value => value.replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));
// Netlify makes DEPLOY_PRIME_URL available for branch and PR previews. Use it
// for share cards so preview services can fetch assets from the same build.
const deployOrigin = process.env.DEPLOY_PRIME_URL?.replace(/\/$/, "") || siteUrl;
const deploySocialImage = `${deployOrigin}/social/niya-preview.png`;

for (const [route, [title, description]] of Object.entries(meta)) {
  // The existing Netlify 301 is authoritative for this legacy event route.
  if (route === "/events/halal-money-forum-nj/") continue;
  const url = `${siteUrl}${route}`;
  const properties = {
    "og:type": "website", "og:site_name": "Niya Venture Studio", "og:locale": "en_US",
    "og:title": title, "og:description": description, "og:url": `${deployOrigin}${route}`,
    "og:image": deploySocialImage, "og:image:secure_url": deploySocialImage, "og:image:type": "image/png",
    "og:image:width": "1200", "og:image:height": "630",
    "og:image:alt": "Niya Venture Studio — Building the Muslim Economy, together.",
  };
  const names = {
    description, "twitter:card": "summary_large_image", "twitter:title": title,
    "twitter:description": description, "twitter:image": deploySocialImage,
    "twitter:image:alt": properties["og:image:alt"],
    ...(route === "/thanks/" ? { robots: "noindex" } : {}),
  };
  const tags = [
    "<!-- site-meta:start -->", `<title>${escape(title)}</title>`,
    `<link rel="canonical" href="${escape(url)}" />`,
    ...Object.entries(properties).map(([key, value]) => `<meta property="${key}" content="${escape(value)}" />`),
    ...Object.entries(names).map(([key, value]) => `<meta name="${key}" content="${escape(value)}" />`),
    "<!-- site-meta:end -->",
  ].join("\n    ");
  const directory = path.join(dist, route);
  await mkdir(directory, { recursive: true });
  await writeFile(path.join(directory, "index.html"), template.replace(marker, tags));
}
console.log("Built initial-HTML social metadata for every canonical page.");
