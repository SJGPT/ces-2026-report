
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CES_IMAGES_ROOT = "C:\\Users\\o2min\\Desktop\\Antigrabity\\CES 2026\\CES 2026";
const REPORT_ROOT = path.resolve(__dirname, '..');
const PUBLIC_IMAGES_ROOT = path.join(REPORT_ROOT, 'public', 'images', 'products');
const DATA_FILE = path.join(REPORT_ROOT, 'src', 'data', 'reportData.json');

// Ensure public images products dir exists
if (!fs.existsSync(PUBLIC_IMAGES_ROOT)) {
    fs.mkdirSync(PUBLIC_IMAGES_ROOT, { recursive: true });
}

const mapping = {
    "Hyundai Motors_Atlas Robot": "atlas-electric",
    "LG전자_CLOiD": "lg-cloid",
    "Sharpa North Robot": "sharpa-north",
    "로보락 Roborock Saros Rover": "roborock-saros",
    "Loona Desk Mate": "loona-deskmate",
    "Razer_Ava": "razer-ava"
};

const extensions = ['.jpg', '.jpeg', '.png', '.webp'];

async function main() {
    console.log('Reading report data...');
    const reportData = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
    let updatedCount = 0;

    for (const [folderName, productId] of Object.entries(mapping)) {
        const sourceDir = path.join(CES_IMAGES_ROOT, folderName);

        // Check if source folder exists
        if (!fs.existsSync(sourceDir)) {
            console.warn(`Source directory not found: ${sourceDir}`);
            continue;
        }

        console.log(`Processing ${folderName} -> ${productId}`);

        // Find product in JSON
        const product = reportData.products.find(p => p.id === productId);
        if (!product) {
            console.warn(`Product ID not found in JSON: ${productId}`);
            continue;
        }

        // Read files
        const files = fs.readdirSync(sourceDir).filter(file => {
            const ext = path.extname(file).toLowerCase();
            return extensions.includes(ext);
        });

        if (files.length === 0) {
            console.log(`No images found in ${sourceDir}`);
            continue;
        }

        // Create target dir
        const targetDir = path.join(PUBLIC_IMAGES_ROOT, productId);
        if (!fs.existsSync(targetDir)) {
            fs.mkdirSync(targetDir, { recursive: true });
        }

        // Copy and create new paths
        const newImagePaths = [];
        files.forEach((file, index) => {
            // Limit to 4 images to be safe
            if (index >= 4) return;

            const ext = path.extname(file).toLowerCase();
            const newFileName = `${productId}_${index + 1}${ext}`;
            const sourcePath = path.join(sourceDir, file);
            const targetPath = path.join(targetDir, newFileName);

            fs.copyFileSync(sourcePath, targetPath);
            console.log(`Copied ${file} to ${newFileName}`);

            newImagePaths.push(`/images/products/${productId}/${newFileName}`);
        });

        // Update product
        product.images = newImagePaths;
        updatedCount++;
    }

    if (updatedCount > 0) {
        fs.writeFileSync(DATA_FILE, JSON.stringify(reportData, null, 2), 'utf-8');
        console.log(`Updated ${updatedCount} products in reportData.json`);
    } else {
        console.log('No updates made.');
    }
}

main().catch(console.error);
