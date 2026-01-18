
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REPORT_ROOT = path.resolve(__dirname, '..');
const DATA_FILE = path.join(REPORT_ROOT, 'src', 'data', 'reportData.json');
const PUBLIC_IMAGES_ROOT = path.join(REPORT_ROOT, 'public', 'images', 'products');

// Input paths from generation (hardcoded for this run)
const generatedImages = {
    "ludens-cocomo": "C:/Users/o2min/.gemini/antigravity/brain/4facf5fc-5bee-43cc-9368-564ab04fe601/ludens_cocomo_gen_1768551834031.png",
    "rabbit-r1-desk": "C:/Users/o2min/.gemini/antigravity/brain/4facf5fc-5bee-43cc-9368-564ab04fe601/rabbit_r1_desk_gen_1768551850352.png",
    "grok-desktop": "C:/Users/o2min/.gemini/antigravity/brain/4facf5fc-5bee-43cc-9368-564ab04fe601/grok_desktop_gen_1768551867447.png"
};

async function main() {
    const reportData = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
    let updatedCount = 0;

    for (const [id, sourcePath] of Object.entries(generatedImages)) {
        if (!fs.existsSync(sourcePath)) {
            console.error(`Source not found: ${sourcePath}`);
            continue;
        }

        const product = reportData.products.find(p => p.id === id);
        if (!product) {
            console.error(`Product ${id} not found in JSON`);
            continue;
        }

        const productDir = path.join(PUBLIC_IMAGES_ROOT, id);
        if (!fs.existsSync(productDir)) {
            fs.mkdirSync(productDir, { recursive: true });
        }

        const fileName = `${id}_gen.png`;
        const targetPath = path.join(productDir, fileName);
        const publicPath = `/images/products/${id}/${fileName}`;

        // Copy file
        fs.copyFileSync(sourcePath, targetPath);
        console.log(`Deployed ${id} to ${targetPath}`);

        // Update JSON
        product.images = [publicPath]; // Overwrite
        updatedCount++;
    }

    // Double check if any products still have empty images or placeholders
    let stillMissing = 0;
    reportData.products.forEach(p => {
        if (!p.images || p.images.length === 0 || p.images.some(i => i.includes('placeholder'))) {
            console.warn(`Product ${p.id} still has placeholder/empty images.`);
            stillMissing++;
        }
    });

    fs.writeFileSync(DATA_FILE, JSON.stringify(reportData, null, 2), 'utf-8');
    console.log(`Success. Deployed ${updatedCount} generated images. Outstanding missing: ${stillMissing}`);
}

main().catch(console.error);
