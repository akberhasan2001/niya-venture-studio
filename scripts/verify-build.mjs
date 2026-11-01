import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { meta, siteUrl, socialImage } from "../app/src/data/site-meta.js";

let checked = 0;
const decode = value => value?.replace(/&(?:amp|lt|gt|quot|#39);/g, entity => ({ "&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": '"', "&#39;": "'" }[entity]));
for (const [route, [title, description]] of Object.entries(meta)) {
  if (route === "/events/halal-money-forum-nj/") continue;
  const html = await readFile(path.join("dist", route, "index.html"), "utf8");
  assert.equal((html.match(/<title>/g) || []).length, 1, `${route}: one initial HTML title`);
  assert(html.includes(`<link rel="canonical" href="${siteUrl}${route}"`), `${route}: canonical URL`);
  for (const key of ["og:title", "og:description", "og:image", "og:url"]) {
    assert.equal((html.match(new RegExp(`property="${key}"`, "g")) || []).length, 1, `${route}: ${key} appears once before JavaScript runs`);
    assert.match(html, new RegExp(`property="${key}" content="[^"]+"`));
  }
  assert(html.includes(`property="og:image" content="${socialImage}"`));
  assert.equal(decode(html.match(/<title>([^<]*)<\/title>/)?.[1]), title, `${route}: correct page title`);
  assert.equal(decode(html.match(/property="og:title" content="([^"]*)"/)?.[1]), title, `${route}: correct social title`);
  assert.equal(decode(html.match(/property="og:description" content="([^"]*)"/)?.[1]), description, `${route}: correct social description`);
  assert.equal(decode(html.match(/property="og:url" content="([^"]*)"/)?.[1]), `${siteUrl}${route}`);
  assert(html.includes('name="twitter:card" content="summary_large_image"'));
  assert(html.includes('name="niya-network"'), `${route}: static form detection survives the build`);
  assert(html.includes('name="routing_email" value="taqi@niyasf.com"'));
  assert(html.includes('name="bot-field"'), `${route}: spam trap declared`);
  if (route === "/thanks/") assert(html.includes('name="robots" content="noindex"'));
  checked++;
}
for (const [file, width, height] of [["social/niya-preview.png",1200,630],["favicon-32.png",32,32],["icon-192.png",192,192],["apple-touch-icon.png",180,180]]) {
  const png = await readFile(path.join("dist", file));
  assert.equal(png.subarray(1,4).toString(), "PNG");
  assert.equal(png.readUInt32BE(16), width, file);
  assert.equal(png.readUInt32BE(20), height, file);
}
assert((await stat("assets/brand/niya-logo.webp")).size < 10000, "Header/footer logo stays below 10 KB.");
console.log(`Verified ${checked} initial HTML pages, form declarations, social image, icons and compressed logo.`);
