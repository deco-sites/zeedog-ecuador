// scripts/generateSitemap.ts

import { ensureDir } from "https://deno.land/std@0.224.0/fs/mod.ts";
import { walk } from "https://deno.land/std@0.224.0/fs/walk.ts";

// Configurações
const BLOCKS_DIR = "./.deco/blocks";
const EXTRA_FILES = [
  "./.deco/blocks/pages-All%2520Pages%2520(English)-759510.json",
  "./.deco/blocks/pages-Policies%2520Pages%2520(English)-481137.json",
];
const OUTPUT_DIR = "./static";
const OUTPUT_FILE = `${OUTPUT_DIR}/sitemap_pages_custom.xml`;
const BASE_URL = "https://www.zeedog.pe/";
const today = new Date().toISOString().split("T")[0];

const urls = new Set<string>();

// Função para extrair URLs de um arquivo JSON
async function processJsonFile(filePath: string) {
  try {
    const fileContent = await Deno.readTextFile(filePath);
    const json = JSON.parse(fileContent);

    // Concatena todos os arrays de variants possíveis
    let variants: any[] = [];

    if (Array.isArray(json?.variants)) {
      variants = variants.concat(json.variants);
    }

    if (Array.isArray(json?.sections)) {
      for (const section of json.sections) {
        if (Array.isArray(section?.variants)) {
          variants = variants.concat(section.variants);
        }
      }
    }

    if (Array.isArray(json?.value?.variants)) {
      variants = variants.concat(json.value.variants);
    }

    for (const variant of variants) {
      const pathname = variant?.rule?.case?.pathname ??
        variant?.rule?.pathname ??
        null;

      if (pathname && typeof pathname === "string") {
        urls.add(pathname);
      }
    }
  } catch (err) {
    console.warn(`⚠️ Erro ao processar ${filePath}: ${err.message}`);
  }
}

async function generateSitemapXML() {
  // Processa todos os arquivos encontrados via walk
  for await (const entry of walk(BLOCKS_DIR, { includeDirs: false })) {
    if (entry.name.endsWith("Page.json")) {
      await processJsonFile(entry.path);
    }
  }

  // Processa os arquivos extras
  for (const extraFile of EXTRA_FILES) {
    await processJsonFile(extraFile);
  }

  const sortedUrls = Array.from(urls).sort();

  const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${
    sortedUrls
      .map(
        (url) =>
          `  <url>
    <loc>${BASE_URL}${url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
  </url>`,
      )
      .join("\n")
  }
</urlset>`;

  await ensureDir(OUTPUT_DIR);
  await Deno.writeTextFile(OUTPUT_FILE, xmlContent);

  console.log(
    `✅ sitemap_pages_custom.xml gerado com ${sortedUrls.length} URLs.`,
  );
}

// Executa o script
generateSitemapXML();
