const fs = require('fs');

console.log('--- 1. STATIC ID AUDIT ---');
const html = fs.readFileSync('index.html', 'utf8');
const js = fs.readFileSync('app.js', 'utf8');

const regex = /getElementById\(['"]([^'"]+)['"]\)/g;
let match;
const usedIds = new Set();
while ((match = regex.exec(js)) !== null) {
  usedIds.add(match[1]);
}

const missing = [];
for (const id of usedIds) {
  // Check if id exists statically in HTML OR is dynamically generated in template literals
  const inHtml = html.includes(`id="${id}"`) || html.includes(`id='${id}'`);
  const inJsTemplate = js.includes(`id="${id}"`) || js.includes(`id='${id}'`);
  if (!inHtml && !inJsTemplate) {
    missing.push(id);
  }
}

console.log('Total element IDs queried in app.js:', usedIds.size);
if (missing.length > 0) {
  console.log('❌ Potential missing IDs:', missing);
} else {
  console.log('✅ All queried element IDs exist in index.html or dynamic templates!');
}
