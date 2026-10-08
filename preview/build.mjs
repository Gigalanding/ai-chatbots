/** Generate a portable HTML preview from the same components as the Next.js app. */
import { readFile, readdir, mkdir, writeFile } from "node:fs/promises";
import { resolve, dirname, extname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { build } from "esbuild";

const project = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const output = resolve(
  process.argv[2] ||
    join(project, "preview", "EduWorkflow-design-preview.html"),
);
const mime = {
  ".png": "image/png",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
};
const assets = new Map();
for (const directory of ["", "logos"]) {
  for (const name of await readdir(join(project, "public", directory))) {
    if (!mime[extname(name)]) continue;
    const bytes = await readFile(join(project, "public", directory, name));
    assets.set(
      "/" + [directory, name].filter(Boolean).join("/"),
      `data:${mime[extname(name)]};base64,${bytes.toString("base64")}`,
    );
  }
}

const result = await build({
  entryPoints: [join(project, "preview", "entry.tsx")],
  bundle: true,
  write: false,
  minify: true,
  platform: "browser",
  format: "iife",
  jsx: "automatic",
  define: { "process.env.NODE_ENV": '"production"' },
  alias: { "@": join(project, "src") },
  plugins: [
    {
      name: "portable-preview",
      setup(plugin) {
        plugin.onResolve({ filter: /^next\/image$/ }, () => ({
          path: "next-image-preview",
          namespace: "preview",
        }));
        plugin.onLoad({ filter: /.*/, namespace: "preview" }, () => ({
          resolveDir: project,
          loader: "tsx",
          contents: `import React from 'react'; export default function Image({unoptimized, priority, fill, quality, loader, ...props}) { return <img {...props} />; }`,
        }));
        plugin.onLoad({ filter: /\.(ts|tsx)$/ }, async (args) => {
          if (args.path.includes("/node_modules/")) return;
          let contents = await readFile(args.path, "utf8");
          for (const [path, data] of assets) {
            contents = contents
              .replaceAll('"' + path + '"', '"' + data + '"')
              .replaceAll("'" + path + "'", "'" + data + "'");
          }
          return {
            contents,
            loader: args.path.endsWith(".tsx") ? "tsx" : "ts",
          };
        });
      },
    },
  ],
});

const cssFiles = (
  await readdir(join(project, ".next", "static", "chunks"))
).filter((file) => file.endsWith(".css"));
let css = "";
for (const file of cssFiles)
  css += await readFile(
    join(project, ".next", "static", "chunks", file),
    "utf8",
  );
// Remove Next's font path and supply the exact same variable font inline.
css = css.replace(/@font-face\s*\{[^}]*\}/g, "");
const font = (
  await readFile(
    join(project, "src", "app", "fonts", "inter-latin-wght-normal.woff2"),
  )
).toString("base64");
css += `@font-face{font-family:PreviewInter;src:url(data:font/woff2;base64,${font}) format('woff2');font-weight:100 900;font-display:swap}:root{--font-inter:PreviewInter}.preview-label{position:fixed;bottom:13px;left:13px;z-index:20;display:flex;gap:7px;align-items:center;border:1px solid #ccd5c2;border-radius:30px;padding:7px 11px;background:#f8faf2e8;backdrop-filter:blur(8px);font-size:7px;letter-spacing:.4px;color:#7c896b}.preview-label a{color:#51683f}.preview-booking-card{max-width:600px;margin:auto;background:#fff;border:1px solid var(--rule);padding:35px;text-align:center;border-radius:10px}.preview-booking-mark{display:grid;place-items:center;width:42px;height:42px;border-radius:50%;background:var(--lime);color:var(--leaf);font-size:25px;margin:0 auto 20px}.preview-booking-card h3{font:italic 33px/1.2 Georgia,serif;color:var(--ink)}.preview-booking-card p{max-width:310px;margin:18px auto 24px;font-size:11px;color:var(--muted)}.preview-contact{position:relative}.preview-form-note{position:absolute;top:24px;left:0;right:0;text-align:center;color:#859477;font-size:9px}.preview-booking{padding-block:80px}.preview-label+*{display:none}@media(max-width:540px){.preview-label{display:none}.preview-form-note{font-size:8px}}`;
const js = result.outputFiles[0].text.replaceAll("</script", "<\\/script");
css += `.preview-legal-dialog{max-width:min(430px,calc(100vw - 32px));margin:auto;padding:30px;border:1px solid var(--rule);border-radius:10px;background:var(--paper);color:var(--ink)}.preview-legal-dialog::backdrop{background:#222b20bb;backdrop-filter:blur(5px)}.preview-legal-dialog h2{font-size:25px;font-weight:400}.preview-legal-dialog p{font-size:12px;color:var(--muted);line-height:1.8;margin:16px 0 23px}`;
const html = `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="theme-color" content="#f6f6f0"><title>EduWorkflow Labs · Design preview</title><style>${css}</style></head><body><div id="root"></div><noscript>This interactive preview needs JavaScript enabled.</noscript><script>${js}</script></body></html>`;
await mkdir(dirname(output), { recursive: true });
await writeFile(output, html);
console.log(
  `Created ${output} (${(Buffer.byteLength(html) / 1024).toFixed(0)} KiB).`,
);
