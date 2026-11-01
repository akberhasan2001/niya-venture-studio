// One-off asset preparation. Assets are committed; production builds do not need Sharp.
// If Sharp is provided by a separate runtime, set NIYA_SHARP_MODULE to its entry file.
import { mkdir, readFile, writeFile, stat } from "node:fs/promises";
const sharp = (await import(process.env.NIYA_SHARP_MODULE || "sharp")).default;
const original = await readFile("logo-niya-sf.jpg");
const { width, height } = await sharp(original).metadata();
await mkdir("assets/brand", { recursive: true });
await mkdir("app/public/social", { recursive: true });
await sharp(original).resize(192, 192).webp({ quality: 82 }).toFile("assets/brand/niya-logo.webp");

// Crop the actual crescent and its stars, leaving out the raster wordmark below it.
const crescent = await sharp(original).extract({ left: Math.round(width * .20), top: Math.round(height * .19), width: Math.round(width * .60), height: Math.round(height * .60) }).resize(384, 384).png().toBuffer();
for (const [size, file] of [[32, "favicon-32.png"], [192, "icon-192.png"], [180, "apple-touch-icon.png"]]) {
  await sharp(crescent).resize(size, size).png({ compressionLevel: 9 }).toFile(`app/public/${file}`);
}
const icon = await readFile("app/public/favicon-32.png");
const header = Buffer.alloc(22);
header.writeUInt16LE(1, 2); header.writeUInt16LE(1, 4);
header[6] = 32; header[7] = 32; header.writeUInt16LE(1, 10); header.writeUInt16LE(32, 12);
header.writeUInt32LE(icon.length, 14); header.writeUInt32LE(22, 18);
await writeFile("app/public/favicon.ico", Buffer.concat([header, icon]));

const logo = crescent.toString("base64");
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
<rect width="1200" height="630" fill="#fcfbf8"/>
<text x="72" y="83" fill="#0d2137" font-family="Arial,sans-serif" font-size="19" font-weight="700" letter-spacing="3">NIYA VENTURE STUDIO</text>
<text x="68" y="212" fill="#0d2137" font-family="Georgia,serif" font-size="76">Building the</text>
<text x="68" y="300" fill="#1f4e79" font-family="Georgia,serif" font-size="76" font-style="italic">Muslim Economy,</text>
<text x="68" y="388" fill="#0d2137" font-family="Georgia,serif" font-size="76">together.</text>
<rect x="850" y="162" width="280" height="280" rx="16" fill="white"/>
<image x="866" y="178" width="248" height="248" href="data:image/png;base64,${logo}"/>
<path d="M72 499H1128" stroke="#d9dcd9"/>
<text x="72" y="553" fill="#56616d" font-family="Arial,sans-serif" font-size="22">Founders. Capital. Community.</text>
<text x="996" y="553" fill="#0d2137" font-family="Arial,sans-serif" font-size="22">niyasf.com</text>
<rect y="622" width="1200" height="8" fill="#b44422"/>
</svg>`;
await writeFile("assets/brand/social-preview.svg", svg);
await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile("app/public/social/niya-preview.png");
console.log(`Logo: ${original.length} → ${(await stat("assets/brand/niya-logo.webp")).size} bytes; social image: 1200×630.`);
