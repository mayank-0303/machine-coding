// server.js
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = 3000;

// Fix __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files (JS, CSS, images, etc)
app.use(
  "/assets",
  express.static(path.join(__dirname, "../dist/assets"), {
    maxAge: "1y", // aggressive caching
    etag: false,
  })
);

// Fallback to index.html (for React Router)
app.get("*all", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist/index.html"), {
    headers: {
      "Cache-Control": "no-cache",
    },
  });
});

app.listen(PORT, () => {
  console.log(`✅ App running at: http://localhost:${PORT}`);
});
