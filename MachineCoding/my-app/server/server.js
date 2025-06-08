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


app.get('/some-resource', (req, res) => {
  

  //   Caching headers

  const resourceContent = 'This is some static content for our example resource';

  // Generate the ETag based on the content of the resource
  const etag = generateETag(resourceContent);

  // Set Cache-Control header to cache the resource for 1 hour
  res.setHeader('Cache-Control', 'public,private, max-age=3600, s-max-age,must-revalidate,immutable'); // Cache for 1 hour and make it immutable

  // Set Expires header to specify that the resource expires 1 hour from now
  const expiryDate = new Date(Date.now() + 3600 * 1000); // 1 hour from now
  res.setHeader('Expires', expiryDate.toUTCString());

  // Set Last-Modified header to the current time (you could use the actual last modified time of the resource)
  const lastModified = new Date().toUTCString();
  res.setHeader('Last-Modified', lastModified);

  // Set ETag header to the generated ETag
  res.setHeader('ETag', etag);

  // Send the resource content
  res.send(resourceContent);
});

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
