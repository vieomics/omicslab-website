#!/usr/bin/env node
/**
 * Exports the four printable policy documents at /legal/[doc] to PDF files
 * ready to upload to the e-commerce notification portal.
 *
 * Requirements:
 *   - Run `npm run build` first (this produces ./out).
 *   - A Chrome/Chromium binary on PATH (google-chrome, google-chrome-stable,
 *     chromium) or set CHROME_PATH.
 *
 * Usage:
 *   npm run build && npm run pdf:policies
 */
const { spawn, spawnSync } = require("child_process");
const fs = require("fs");
const http = require("http");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const OUT_DIR = path.join(ROOT, "out");
const PDF_DIR = path.join(ROOT, "policy-pdfs");
const PORT = 3000;
const BASE = `http://127.0.0.1:${PORT}`;

/** Source route under /legal/<route> and the Vietnamese PDF filename. */
const DOCUMENTS = [
  { route: "privacy", file: "01-chinh-sach-bao-mat.pdf" },
  {
    route: "complaints",
    file: "02-phuong-thuc-tiep-nhan-va-giai-quyet-phan-anh-yeu-cau-khieu-nai.pdf",
  },
  { route: "pricing", file: "03-chinh-sach-gia.pdf" },
  { route: "payment", file: "04-chinh-sach-thanh-toan.pdf" },
];

const CHROME_CANDIDATES = [
  process.env.CHROME_PATH,
  "google-chrome-stable",
  "google-chrome",
  "chromium",
  "chromium-browser",
].filter(Boolean);

function findChrome() {
  for (const candidate of CHROME_CANDIDATES) {
    if (candidate.includes(path.sep)) {
      if (fs.existsSync(candidate)) return candidate;
      continue;
    }
    const which = spawnSync("which", [candidate], { encoding: "utf8" });
    if (which.status === 0 && which.stdout.trim()) {
      return which.stdout.trim();
    }
  }
  return null;
}

function waitForServer(retries = 50) {
  return new Promise((resolve, reject) => {
    const attempt = (remaining) => {
      const request = http.get(`${BASE}/`, (response) => {
        response.resume();
        resolve();
      });
      request.on("error", () => {
        if (remaining <= 0) {
          reject(new Error(`Preview server did not start on port ${PORT}`));
          return;
        }
        setTimeout(() => attempt(remaining - 1), 200);
      });
    };
    attempt(retries);
  });
}

function printPdf(chrome, url, outFile) {
  const result = spawnSync(
    chrome,
    [
      "--headless=new",
      "--no-sandbox",
      "--disable-gpu",
      "--disable-dev-shm-usage",
      "--no-pdf-header-footer",
      "--run-all-compositor-stages-before-draw",
      "--virtual-time-budget=20000",
      `--print-to-pdf=${outFile}`,
      url,
    ],
    { encoding: "utf8" },
  );
  return result;
}

async function main() {
  if (!fs.existsSync(OUT_DIR)) {
    console.error("No ./out directory found. Run `npm run build` first.");
    process.exit(1);
  }

  const chrome = findChrome();
  if (!chrome) {
    console.error(
      "Chrome/Chromium not found. Install google-chrome or set CHROME_PATH.",
    );
    process.exit(1);
  }

  fs.mkdirSync(PDF_DIR, { recursive: true });

  const server = spawn("node", [path.join(ROOT, "server.js")], {
    cwd: ROOT,
    stdio: "ignore",
  });

  try {
    await waitForServer();

    for (const doc of DOCUMENTS) {
      const url = `${BASE}/legal/${doc.route}`;
      const outFile = path.join(PDF_DIR, doc.file);
      const result = printPdf(chrome, url, outFile);

      if (result.status !== 0 || !fs.existsSync(outFile)) {
        console.error(`✗ ${doc.file} — ${result.stderr || "failed"}`);
        process.exitCode = 1;
        continue;
      }

      const kb = Math.round(fs.statSync(outFile).size / 1024);
      console.log(`✓ ${path.relative(ROOT, outFile)} (${kb} KB)`);
    }
  } finally {
    server.kill("SIGTERM");
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
