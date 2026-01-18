
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const jsonPath = path.join(__dirname, '../src/data/reportData.json');

const updateMap = {
    "atlas-electric": ["/images/atlas_1.jpg", "/images/atlas_2.jpg", "/images/atlas_3.jpg"],
    "lg-cloid": ["/images/cloid_1.png", "/images/cloid_2.png", "/images/cloid_3.png"],
    "samsung-ballie": ["/images/ballie_1.jpg", "/images/atlas.png", "/images/hero_bg.png"], // Fallback to hero/atlas if needed
    "roborock-saros": ["/images/saros_1.jpg", "/images/atlas.png", "/images/hero_bg.png"]
};

try {
    const data = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
    let count = 0;

    data.products.forEach(p => {
        if (updateMap[p.id]) {
            p.images = updateMap[p.id];
            count++;
        }
    });

    fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2));
    console.log(`Updated images for ${count} products.`);
} catch (e) {
    console.error("Error patching images:", e);
}
