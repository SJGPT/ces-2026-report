
import fs from 'fs';
import path from 'path';
import https from 'https';
import http from 'http';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REPORT_ROOT = path.resolve(__dirname, '..');
const DATA_FILE = path.join(REPORT_ROOT, 'src', 'data', 'reportData.json');
const PUBLIC_IMAGES_ROOT = path.join(REPORT_ROOT, 'public', 'images', 'products');

const productImages = {
    // Batch 1
    "figure-ai": "https://humanoid.guide/wp-content/uploads/2024/11/Humanoidguide_Figure2_wm.webp",
    "unitree-g1": "https://www.unitree.com/images/396b6c810c4a4d8b9710e76bb0d7cc4b_3840x3602.png",
    "agility-digit": "https://cdn.prod.website-files.com/677da499fb14323aabb5b0c9/68475a7b41dc3c124423209f_digit-working.jpg",
    "apptronik-apollo": "https://cdn.prod.website-files.com/646de3abb3e62d339f089e28/64e49f4de3eef177a948c864_2%20trans%20edit%20standing.png",
    "sanctuary-phoenix": "https://images.squarespace-cdn.com/content/v1/66e8617ff9cbf43e43b040ef/1726505362033-TYPOKEGL3SA332WFWH2O/main-image-phoenix-annoucement.jpg",
    "1x-neo": "https://cdn.sanity.io/images/qka6yvsc/production/c1a93f30beb4c513da832bcd886db94419e06be2-4096x2731.webp",
    "embodied-tien-kung": "https://humanoid.guide/wp-content/uploads/2026/01/Tien-Kung-2.0-humanoid-robot-by-Paxini-humanoid-guide.webp",

    // Batch 2
    "gole-aa2": "https://www.ces.tech/media/i1lpw4uq/v2_2026_aa-2-autonomousdeliveryairobotforpremiumresidences-air-amr2-1.jpg?width=1000&height=666&format=webp&quality=80",
    "doosan-scan-go": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7cDlEWhgB0W6-oY4NuvtpIa-kNYotKyhnag&s",
    "zeroth-rolling": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT11GJS2Z5hFORmLKIpNclvk33SI-ixDp_bBQ&s",
    "dreame-climber": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQie9BWMt1PX26mqzogqkvtBZTSqJ_aKm5udw&s",
    "ecovacs-deebot-x": "https://site-static.ecovacs.com/upload/us/image/product/2025/09/18/065303_4957$id-x2-omni-black-920x920.png",
    "narwal-freo": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvbhP1e-GvHOEmN23F9Qgmc6_cz7097ov00Q&s",
    "irobot-combo": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBky9hdo_WhMkTraG27Wg1C1sJDatabF-YUQ&s",
    "bosch-home": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIEzuQ2EJDmZm36LbzP03WjlwL1xnp4PsU-Q&s",

    // Batch 3
    "anan-panda": "https://www.yankodesign.com/images/design_news/2026/01/anan-at-ces-2026-biomimetic-wool-panda-that-responds-to-your-hugs/an-an-robotic-panda-01.jpg",
    "ludens-cocomo": "https://d29szjachogqwa.cloudfront.net/images/user-uploaded/cocomo.jpg",
    "zeroth-tabletop": "https://www.zeroth0.com/cdn/shop/files/Product_Card_M1_01.png",
    "rabbit-r1-desk": "https://images.squarespace-cdn.com/content/v1/646d6168019a8616183a9925/d26987f6-6b60-449b-8149-c12852237893/Rabbit_R1_1.jpg",
    "grok-desktop": "https://images.squarespace-cdn.com/content/v1/568be7142399a367469a4c54/1512411993275-OHW0YXZ2J8Y8Y0Y8Y0Y8/Concrete+Speaker+Front.jpg",
    "emo-update": "https://i0.wp.com/living.ai/wp-content/uploads/2020/12/product2.jpg",
    "vector-2-revival": "https://anki.bot/cdn/shop/files/Vector-box_dda8cc5a-84a3-434e-b4fc-bdefbaec380d.png",
    "miko-mini": "https://miko.ai/cdn/shop/files/mini-flatscreen-edit.png"
};

const downloadImage = (url, filepath) => {
    return new Promise((resolve, reject) => {
        const protocol = url.startsWith('https') ? https : http;
        protocol.get(url, (res) => {
            if (res.statusCode === 302 || res.statusCode === 301) {
                downloadImage(res.headers.location, filepath).then(resolve).catch(reject);
                return;
            }
            if (res.statusCode !== 200) {
                reject(new Error(`Failed to download ${url}: Status ${res.statusCode}`));
                return;
            }
            const fileStream = fs.createWriteStream(filepath);
            res.pipe(fileStream);
            fileStream.on('finish', () => {
                fileStream.close();
                resolve(filepath);
            });
        }).on('error', (err) => {
            fs.unlink(filepath, () => { });
            reject(err);
        });
    });
};

async function main() {
    console.log('Reading report data...');
    const reportData = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
    let updatedCount = 0;

    for (const [id, url] of Object.entries(productImages)) {
        const product = reportData.products.find(p => p.id === id);
        if (!product) {
            console.warn(`Product ID ${id} not found in reportData.json`);
            continue;
        }

        const productDir = path.join(PUBLIC_IMAGES_ROOT, id);
        if (!fs.existsSync(productDir)) {
            fs.mkdirSync(productDir, { recursive: true });
        }

        // Determine extension
        let ext = '.jpg';
        if (url.includes('.png')) ext = '.png';
        if (url.includes('.webp')) ext = '.webp';
        if (url.includes('format=webp')) ext = '.webp';

        const fileName = `${id}_1${ext}`;
        const filePath = path.join(productDir, fileName);
        const publicPath = `/images/products/${id}/${fileName}`;

        console.log(`Downloading image for ${id}...`);
        try {
            await downloadImage(url, filePath);

            // Update product images
            // We overwrite existing placeholders or empty arrays
            // But we PRESERVE existing valid images if they exist and are not placeholders
            const existingImages = product.images.filter(img => !img.includes('placeholder') && !img.includes('generic'));

            // If we just downloaded this one, add it to the front or replace
            // In this case, we simple assume this is the definitive image if existing ones were weak
            if (existingImages.length === 0) {
                product.images = [publicPath];
            } else {
                // Check if already exists to avoid duplicates
                if (!existingImages.includes(publicPath)) {
                    product.images = [publicPath, ...existingImages];
                }
            }

            updatedCount++;
        } catch (err) {
            console.error(`Error downloading ${id}:`, err.message);
        }
    }

    fs.writeFileSync(DATA_FILE, JSON.stringify(reportData, null, 2), 'utf-8');
    console.log(`Success! Updated ${updatedCount} products with new images.`);
}

main().catch(console.error);
