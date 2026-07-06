import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { deflateSync } from "node:zlib";

const WIDTH = 1200;
const HEIGHT = 630;
const OUTPUT_ROOT = join(process.cwd(), "public", "og");

const PROJECT_SLUGS = [
  "codev-erp",
  "codev-tim",
  "poj-pro-platform",
  "poj-pro-site",
  "assistant-agent",
  "poj-pro-api-contracts",
  "poj-pro-telegram-bots",
];

function crc32(buffer) {
  let crc = 0xffffffff;

  for (const byte of buffer) {
    crc ^= byte;
    for (let index = 0; index < 8; index += 1) {
      crc = crc & 1 ? 0xedb88320 ^ (crc >>> 1) : crc >>> 1;
    }
  }

  return (crc ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const length = Buffer.alloc(4);
  length.writeUInt32BE(data.length, 0);
  const typeBuffer = Buffer.from(type);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(Buffer.concat([typeBuffer, data])), 0);
  return Buffer.concat([length, typeBuffer, data, crc]);
}

function createSolidPng(background, accent) {
  const rowSize = 1 + WIDTH * 3;
  const raw = Buffer.alloc(rowSize * HEIGHT);

  for (let y = 0; y < HEIGHT; y += 1) {
    const rowOffset = y * rowSize;
    raw[rowOffset] = 0;

    for (let x = 0; x < WIDTH; x += 1) {
      const pixelOffset = rowOffset + 1 + x * 3;
      const useAccent = y < 8 || x < 8;
      const color = useAccent ? accent : background;
      raw[pixelOffset] = color[0];
      raw[pixelOffset + 1] = color[1];
      raw[pixelOffset + 2] = color[2];
    }
  }

  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(WIDTH, 0);
  ihdr.writeUInt32BE(HEIGHT, 4);
  ihdr[8] = 8;
  ihdr[9] = 2;
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;

  return Buffer.concat([
    signature,
    chunk("IHDR", ihdr),
    chunk("IDAT", deflateSync(raw)),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

function writeOgImage(relativePath, background, accent) {
  const outputPath = join(OUTPUT_ROOT, relativePath);
  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, createSolidPng(background, accent));
}

const defaultBackground = [7, 9, 15];
const defaultAccent = [240, 180, 41];

writeOgImage("default.png", defaultBackground, defaultAccent);

for (const slug of PROJECT_SLUGS) {
  const hash = createHash("sha1").update(slug).digest();
  const accent = [
    160 + (hash[0] % 80),
    120 + (hash[1] % 80),
    40 + (hash[2] % 80),
  ];
  writeOgImage(`projects/${slug}.png`, defaultBackground, accent);
}

const defaultBytes = readFileSync(join(OUTPUT_ROOT, "default.png"));
if (defaultBytes.length < 1000) {
  throw new Error("Generated OG image is unexpectedly small.");
}

console.log(`Generated default OG and ${PROJECT_SLUGS.length} project OG images.`);
