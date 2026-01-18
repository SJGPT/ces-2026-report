
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { https } from 'follow-redirects';
// Wait, 'https' module is built-in, but handling redirects manually is annoying. 
// Node 18 fetch is easiest.

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const jsonPath = path.join(__dirname, '../src/data/reportData.json');
const publicDir = path.join(__dirname, '../public/images');

// Ensure public/images exists
if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
}

const args = process.argv.slice(2);
if (args.length < 2) {
    console.log("Usage: node scripts/addImage.js <product-id> <image-url>");
    console.log("Available IDs:");
    const data = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
    data.products.forEach(p => console.log(` - ${p.id} (${p.name})`));
    process.exit(1);
}

const [productId, imageUrl] = args;

async function downloadImage(url, dest) {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.statusText}`);
    const arrayBuffer = await res.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    fs.writeFileSync(dest, buffer);
}

async function main() {
    try {
        console.log(`Reading data...`);
        const data = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));

        const product = data.products.find(p => p.id === productId);
        if (!product) {
            console.error(`Error: Product ID '${productId}' not found.`);
            process.exit(1);
        }

        console.log(`Downloading image for ${product.name}...`);
        const timestamp = Date.now();
        const ext = path.extname(new URL(imageUrl).pathname) || '.jpg';
        const filename = `${productId}_${timestamp}${ext}`; // e.g. samsung-ballie_123456.jpg
        const destPath = path.join(publicDir, filename);

        await downloadImage(imageUrl, destPath);
        console.log(`Saved to public/images/${filename}`);

        // Update JSON
        const relativePath = `/images/${filename}`;

        // Remove placeholder if present (optional logic)
        product.images = product.images.filter(img => !img.includes('atlas.png') && !img.includes('placeholder'));

        // Add new image to the front
        product.images.unshift(relativePath);

        fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2));
        console.log(`Updated reportData.json`);
        console.log(`Success! Image added to ${product.name}`);

    } catch (e) {
        console.error("Error:", e.message);
    }
}

main();
