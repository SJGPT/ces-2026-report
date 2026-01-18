
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

// 1. Define Mappings (Folder Name -> ID)
// Existing + New
const folderToData = {
    "Hyundai Motors_Atlas Robot": {
        id: "atlas-electric",
        exists: true
    },
    "LG전자_CLOiD": {
        id: "lg-cloid",
        exists: true
    },
    "Sharpa North Robot": {
        id: "sharpa-north",
        exists: true
    },
    "로보락 Roborock Saros Rover": {
        id: "roborock-saros",
        exists: true
    },
    "Loona Desk Mate": {
        id: "loona-deskmate",
        exists: true
    },
    "Razer_Ava": {
        id: "razer-ava",
        exists: true
    },
    // NEW PRODUCTS
    "Hapware_Aleye": {
        id: "hapware-aleye",
        exists: false,
        typeId: "type3",
        manufacturer: "Hapware",
        name: "Aleye",
        country: "USA",
        overview: "A wearable AI companion that clips onto glasses, providing visual context awareness and subtle haptic feedback for navigation.",
        analysis: {
            intro: "Wearable Insight",
            points: [
                { title: "Clip-on Form", content: "Attaches non-intrusively to existing eyewear frames." },
                { title: "Haptic Guidance", content: "Uses gentle vibrations to guide users without audio visual distraction." }
            ]
        }
    },
    "Lego SmartBrick": {
        id: "lego-smartbrick",
        exists: false,
        typeId: "type3",
        manufacturer: "Lego",
        name: "SmartBrick",
        country: "Denmark",
        overview: "An interactive, motorized Lego brick that brings sets to life with behavior programming via simple physical toggles.",
        analysis: {
            intro: "Playful Physics",
            points: [
                { title: "Tactile Coding", content: "Programming is done through physical brick placement, not screens." },
                { title: "Universal Fit", content: "Compatible with all existing Lego systems, upgrading legacy sets." }
            ]
        }
    },
    "Lepro Ami": {
        id: "lepro-ami",
        exists: false,
        typeId: "type3",
        manufacturer: "Lepro",
        name: "Ami",
        country: "Global",
        overview: "A desktop lighting companion that adjusts ambience based on your mood and music, using AI to detect emotional states.",
        analysis: {
            intro: "Ambient Empathy",
            points: [
                { title: "Mood Matching", content: "Analyzes facial expressions to shift lighting warm/cool automatically." },
                { title: "Rhythmic Pulse", content: "Pulses gently with music or conversation flow." }
            ]
        }
    },
    "OlloNi_ A Brand New Cyber Pet": {
        id: "olloni-cyberpet",
        exists: false,
        typeId: "type3",
        manufacturer: "OlloNi",
        name: "OlloNi Cyber Pet",
        country: "Korea",
        overview: "A next-gen cyber pet focusing on digital evolution. It grows and develops a unique personality based on how you treat it.",
        analysis: {
            intro: "Digital Evolution",
            points: [
                { title: "Growth Algorithm", content: "Unlike static toys, its code rewrites itself to mature over time." },
                { title: "Social Linking", content: "Can play with other OlloNi units nearby." }
            ]
        }
    },
    "Samsung Display": {
        id: "samsung-display-ai",
        exists: false,
        typeId: "type3",
        manufacturer: "Samsung Display",
        name: "AI Display Concepts",
        country: "Korea",
        overview: "Next-generation OLED concepts featuring the 'AI Agent' and 'AI OLED Bot', showcasing flexible screens that move and adapt.",
        isCombined: true, // Special flag to look in subfolders
        analysis: {
            intro: "Flexible Future",
            points: [
                { title: "Shape Changing", content: "Screens that bend to face the user or close for privacy." },
                { title: "360 Interaction", content: "Displays that are visible and interactive from all angles." }
            ]
        }
    },
    "SwitchBot_Onero H1": {
        id: "switchbot-onero",
        exists: false,
        typeId: "type2",
        manufacturer: "SwitchBot",
        name: "Onero H1",
        country: "China",
        overview: "A heavy-duty home maintenance robot capable of lifting heavy objects and performing plumbing or electrical fixes.",
        analysis: {
            intro: "Utility First",
            points: [
                { title: "Heavy Lifting", content: "Strong actuators allow it to move furniture for cleaning." },
                { title: "Modular Tools", content: "Swappable hands for different repair tasks." }
            ]
        }
    },
    "Tombot Jennie": {
        id: "tombot-jennie",
        exists: false,
        typeId: "type3",
        manufacturer: "Tombot",
        name: "Jennie",
        country: "USA",
        overview: "A hyper-realistic robotic golden retriever designed for seniors with dementia, providing emotional support without the care burden.",
        analysis: {
            intro: "Therapeutic Realism",
            points: [
                { title: "Realistic Fur", content: "Medical-grade synthetic fur feels indistinguishable from a real dog." },
                { title: "Puppy Behavior", content: "Mimics the needy, loving behavior of a young dog." }
            ]
        }
    },
    "레노버 Lenovo ThinkBook Plus 7세대 Auto Twist": {
        id: "lenovo-thinkbook-twist",
        exists: false,
        typeId: "type3",
        manufacturer: "Lenovo",
        name: "ThinkBook Auto Twist",
        country: "China",
        overview: "A laptop with a motorized hinge that automatically rotates the screen to follow you during video calls or closes when you leave.",
        analysis: {
            intro: "Motorized Utility",
            points: [
                { title: "Auto-Framing", content: "Physical rotation keeps the camera centered on the user." },
                { title: "Security Close", content: "Lid automatically closes when the user walks away." }
            ]
        }
    }
};

const extensions = ['.jpg', '.jpeg', '.png', '.webp', '.jfif'];

function copyImages(sourceDir, productId, targetFiles = []) {
    const files = fs.readdirSync(sourceDir).filter(file => {
        const ext = path.extname(file).toLowerCase();
        // Skip directories here (except for Samsung recursive check handled separately)
        return extensions.includes(ext);
    });

    const targetDir = path.join(PUBLIC_IMAGES_ROOT, productId);
    if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
    }

    // Determine start index based on existing files added to list
    let startIndex = targetFiles.length;

    files.forEach((file, index) => {
        if (targetFiles.length >= 5) return; // Limit total images

        const ext = path.extname(file).toLowerCase();
        const newFileName = `${productId}_${startIndex + index + 1}${ext}`;
        const sourcePath = path.join(sourceDir, file);
        const targetPath = path.join(targetDir, newFileName);

        fs.copyFileSync(sourcePath, targetPath);
        console.log(`Copied ${file} to ${newFileName}`);

        targetFiles.push(`/images/products/${productId}/${newFileName}`);
    });

    return targetFiles;
}

async function main() {
    console.log('Reading report data...');
    const reportData = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
    let updatedCount = 0;
    let addedCount = 0;

    for (const [folderName, info] of Object.entries(folderToData)) {
        const sourceDir = path.join(CES_IMAGES_ROOT, folderName);

        if (!fs.existsSync(sourceDir)) {
            console.warn(`Source directory not found: ${sourceDir}`);
            continue;
        }

        console.log(`Processing ${folderName} -> ${info.id}`);

        let product;
        if (info.exists) {
            product = reportData.products.find(p => p.id === info.id);
        } else {
            // Check if we already added it in a previous run to avoid duplicates
            product = reportData.products.find(p => p.id === info.id);
            if (!product) {
                // Create new product
                product = {
                    id: info.id,
                    typeId: info.typeId,
                    manufacturer: info.manufacturer,
                    name: info.name,
                    country: info.country,
                    overview: info.overview,
                    analysis: info.analysis,
                    images: [],
                    videoUrl: "" // Placeholder
                };
                reportData.products.push(product);
                addedCount++;
            }
        }

        if (!product) {
            console.warn(`Product not found and creation failed for ${info.id}`);
            continue;
        }

        // Handle Images
        let imagePaths = [];

        if (info.isCombined) {
            // Samsung case: Look in subfolders
            const subDirs = fs.readdirSync(sourceDir, { withFileTypes: true })
                .filter(dirent => dirent.isDirectory())
                .map(dirent => dirent.name);

            for (const sub of subDirs) {
                const subPath = path.join(sourceDir, sub);
                imagePaths = copyImages(subPath, info.id, imagePaths);
            }
        } else {
            // Normal case
            imagePaths = copyImages(sourceDir, info.id, imagePaths);
        }

        if (imagePaths.length > 0) {
            product.images = imagePaths;
            updatedCount++;
        } else {
            console.warn(`No images found for ${folderName}`);
            // If it's a new product and has no images, we still keep it but maybe with a placeholder?
            if (product.images.length === 0) {
                product.images = ["/images/placeholder_generic.jpg"];
            }
        }
    }

    fs.writeFileSync(DATA_FILE, JSON.stringify(reportData, null, 2), 'utf-8');
    console.log(`Summary: Updated ${updatedCount} products, Added ${addedCount} new products.`);
}

main().catch(console.error);
