const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 3000;
const ROOT = path.join(__dirname, "out");

const MIME = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "application/javascript",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
};

http
  .createServer((req, res) => {
    const parsed = new URL(req.url, "http://localhost");
    let url = parsed.pathname === "/" ? "/index.html" : parsed.pathname;

    if (!path.extname(url)) {
      const withHtml = url.replace(/\/?$/, ".html");
      const withIndex = url.replace(/\/?$/, "/index.html");

      if (fs.existsSync(path.join(ROOT, withHtml))) {
        url = withHtml;
      } else if (fs.existsSync(path.join(ROOT, withIndex))) {
        url = withIndex;
      }
    }

    const filePath = path.join(ROOT, url);

    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404, { "Content-Type": "text/html" });
        fs.readFile(path.join(ROOT, "404.html"), (_, d) =>
          res.end(d || "Not Found"),
        );
      } else {
        const ext = path.extname(filePath);
        res.writeHead(200, { "Content-Type": MIME[ext] || "text/plain" });
        res.end(data);
      }
    });
  })
  .listen(PORT, () => console.log(`Server at http://localhost:${PORT}`));
