// generate-sitemap.js
const fs = require("fs");
const path = require("path");

// Change this to your real domain later
const DOMAIN ="https://janiduperera.netlify.app";

// All your important routes
const pages = [
  "", // homepage
  "about",
  "skills",
  "projects",
  "education",
  "blog",
  "testimonials",
  "contact",
];

// Build XML
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map((page) => {
    return `
  <url>
    <loc>${DOMAIN}/${page}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
  })
  .join("")}
</urlset>`;

// Save into public folder
const publicPath = path.join(__dirname, "public", "sitemap.xml");
fs.writeFileSync(publicPath, sitemap.trim());

console.log("✅ Sitemap generated at public/sitemap.xml");
