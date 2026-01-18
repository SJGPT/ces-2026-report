const fs = require('fs');
const path = require('path');

const REPORT_PATH = 'src/data/reportData.json';
const IMG_SOURCE_DIR = 'C:/Users/14700k/Desktop/구글 Antigravity/CES 2026/ces image';
// Note: Fix path handling for Windows if needed, but node usually handles forward slashes fine.
const IMG_DEST_ROOT = 'public/images/products';

const mapping = {
    '4ne-1': 'neura-4ne-1',
    'AI OLED Bot': 'samsung-ai-oled-bot',
    'Cyber x': 'dreame-cyber-x',
    'EV1': 'strutt-ev1',
    'LilMilo': 'ecovacs-lilmilo',
    'Rovar X3': 'frontier-vex', // Assumption based on context
    'Winbot W3 Omni': 'ecovacs-winbot-w3',
    'cyber 10 ultra': 'dreame-cyber-10',
    'flow 2': 'narwal-flow-2',
    'kata friends': 'switchbot-kata',
    'saros z70': 'roborock-saros'
};

const productsToRestore = [
    {
        "id": "neura-4ne-1",
        "typeId": "type1",
        "manufacturer": "Neura Robotics",
        "name": "4NE-1",
        "country": "Germany",
        "overview": "A cognitive humanoid robot designed for collaborative household tasks, emphasizing safety and predictive assistance.\n\n[KR] 안전과 예측 지원을 강조하며 협력적인 가사 작업을 위해 설계된 인지형 휴머노이드 로봇입니다.",
        "analysis": {
            "intro": "Cognitive Helper\n[KR] 인지 도우미",
            "points": [
                { "title": "Predictive Action", "content": "Anticipates user needs (e.g., opening a door when carrying groceries) based on trajectory analysis.\n\n[KR] 궤적 분석을 기반으로 사용자의 필요(예: 짐을 들고 있을 때 문 열어주기)를 예측합니다." },
                { "title": "Soft Touch", "content": "Force-torque sensors allow it to handle delicate objects like eggs or glassware without crushing them.\n\n[KR] 힘-토크 센서를 통해 계란이나 유리잔 같은 깨지기 쉬운 물체를 깨뜨리지 않고 다룰 수 있습니다." }
            ]
        }
    },
    {
        "id": "samsung-ai-oled-bot",
        "typeId": "type2",
        "manufacturer": "Samsung",
        "name": "AI OLED Bot",
        "country": "Korea",
        "overview": "A circular, rolling robot with a flexible OLED screen that wraps around its body, displaying information in 360 degrees.\n\n[KR] 본체를 감싸는 유연한 OLED 스크린을 갖춘 원형 구동 로봇으로, 360도로 정보를 표시합니다.",
        "analysis": {
            "intro": "Omni-Display\n[KR] 옴니 디스플레이",
            "points": [
                { "title": "360 Visibility", "content": "Information is visible from any angle, reducing the need to position the robot precisely.\n\n[KR] 어떤 각도에서든 정보를 볼 수 있어 로봇의 위치를 정확하게 잡을 필요가 줄어듭니다." },
                { "title": "Emotive Flexibility", "content": "The screen itself bends to create expressions, merging hardware and software into one form.\n\n[KR] 화면 자체가 구부러져 표정을 만들어내며 하드웨어와 소프트웨어를 하나의 형태로 융합합니다." }
            ]
        }
    },
    {
        "id": "dreame-cyber-x",
        "typeId": "type2",
        "manufacturer": "Dreame",
        "name": "Cyber X",
        "country": "China",
        "overview": "An experimental corner-cleaning specialist with a unique shape.\n\n[KR] 독특한 형태를 가진 코너 청소 전문 실험 모델입니다.",
        "analysis": {
            "intro": "Geometric Clean\n[KR] 기하학적 청소",
            "points": [
                { "title": "Square Adaptive Body", "content": "The robot transforms or extends parts of its body to fit perfectly into 90-degree corners.\n\n[KR] 로봇이 90도 코너에 완벽하게 맞도록 차체 일부를 변형하거나 확장합니다." },
                { "title": "Low Profile", "content": "Ultra-thin design allows it to slip under furniture that standard LIDAR towers block.\n\n[KR] 초박형 디자인으로 표준 라이다 탑이 걸리는 가구 밑으로도 들어갈 수 있습니다." }
            ]
        }
    },
    {
        "id": "strutt-ev1",
        "typeId": "type2",
        "manufacturer": "Strutt/Segway",
        "name": "EV1",
        "country": "USA",
        "overview": "A personal mobility companion that follows you like a loyal pet and transforms into a scooter.\n\n[KR] 충실한 반려동물처럼 사용자를 따라다니다가 스쿠터로 변신하는 개인 이동 컴패니언입니다.",
        "analysis": {
            "intro": "Follow & Ride\n[KR] 팔로우 앤 라이드",
            "points": [
                { "title": "Carrying Mode", "content": "Follows the user while carrying heavy groceries, reducing urban walking fatigue.\n\n[KR] 무거운 식료품을 싣고 사용자를 따라다녀 도심 도보 이동의 피로를 줄여줍니다." },
                { "title": "Last-Mile Ride", "content": "Instantly deployable seat transforms it into a rideable device for the final stretch home.\n\n[KR] 즉시 전개 가능한 좌석을 통해 집으로 가는 마지막 구간을 위한 탑승 장치로 변신합니다." }
            ]
        }
    },
    {
        "id": "ecovacs-lilmilo",
        "typeId": "type2",
        "manufacturer": "Ecovacs",
        "name": "LilMilo",
        "country": "China",
        "overview": "A home companion robot designed to follow family members and assist with daily tasks and communication.\n\n[KR] 가족 구성원을 따라다니며 일상 업무와 의사소통을 돕도록 설계된 가정용 반려 로봇입니다.",
        "analysis": {
            "intro": "Social Shadow\n[KR] 소셜 섀도우",
            "points": [
                { "title": "Active Following", "content": "Uses skeletal tracking to follow a specific person, acting as a mobile video call stand or music player.\n\n[KR] 골격 추적 기술을 사용하여 특정 사람을 따라다니며 이동식 화상 통화 스탠드나 음악 플레이어 역할을 합니다." },
                { "title": "Voice Memo Carrier", "content": "Can 'carry' a voice message physically from one person in the kitchen to another in the bedroom.\n\n[KR] 주방에 있는 사람의 음성 메시지를 침실에 있는 다른 사람에게 물리적으로 '배달'할 수 있습니다." }
            ]
        }
    },
    {
        "id": "frontier-vex",
        "typeId": "type2",
        "manufacturer": "Frontier",
        "name": "Vex",
        "country": "Australia",
        "overview": "An all-terrain rover built for scientific exploration and data gathering in remote areas.\n\n[KR] 오지의 과학 탐사 및 데이터 수집을 위해 제작된 전천후 로버입니다.",
        "analysis": {
            "intro": "Remote Explorer\n[KR] 원격 탐험가",
            "points": [
                { "title": "Sample Collection", "content": "Modular arm attachments allow for soil scooping or rock chipping autonomously.\n\n[KR] 모듈식 팔 부착물을 사용하여 자율적으로 토양을 채취하거나 암석을 깰 수 있습니다." },
                { "title": "Long-Range LoRa", "content": "Uses low-frequency radio to transmit data over kilometers without relying on cellular networks.\n\n[KR] 저주파 무선을 사용하여 셀룰러 네트워크에 의존하지 않고 수 킬로미터에 걸쳐 데이터를 전송합니다." }
            ]
        }
    },
    {
        "id": "ecovacs-winbot-w3",
        "typeId": "type2",
        "manufacturer": "Ecovacs",
        "name": "Winbot W3 Omni",
        "country": "China",
        "overview": "A window cleaning robot with a portable station that acts as a safety anchor and battery bank.\n\n[KR] 안전 앵커 및 배터리 뱅크 역할을 하는 휴대용 스테이션이 포함된 창문 청소 로봇입니다.",
        "analysis": {
            "intro": "Vertical Gravity\n[KR] 수직 중력",
            "points": [
                { "title": "Suction Safe", "content": "Constantly monitors air seal pressure and adjusts motor power to prevent falling.\n\n[KR] 공기 밀폐 압력을 지속적으로 모니터링하고 모터 출력을 조정하여 낙하를 방지합니다." },
                { "title": "Edge Detection", "content": "Frameless window detection ensures it doesn't fall off glass balustrades or mirrors.\n\n[KR] 프레임 없는 창문 감지 기능으로 유리 난간이나 거울에서 떨어지지 않습니다." }
            ]
        }
    },
    {
        "id": "dreame-cyber-10",
        "typeId": "type2",
        "manufacturer": "Dreame",
        "name": "Cyber 10 Ultra",
        "country": "China",
        "overview": "A premium robotic vacuum focused on absolute autonomy with minimal maintenance.\n\n[KR] 최소한의 유지 보수로 완벽한 자율성을 추구하는 프리미엄 로봇 청소기입니다.",
        "analysis": {
            "intro": "Zero Maintenance\n[KR] 제로 유지보수",
            "points": [
                { "title": "Self-Cleaning Station", "content": "The base station cleans the mop, empties dust, and even cleans itself, reducing human chores to zero.\n\n[KR] 베이스 스테이션이 걸레 세척, 먼지 비움, 심지어 스테이션 자체 청소까지 수행하여 인간의 가사 노동을 제로로 만듭니다." },
                { "title": "Edge Learning", "content": "Learns the precise contours of furniture over time to clean closer without bumping.\n\n[KR] 시간이 지남에 따라 가구의 정확한 윤곽을 학습하여 부딪힘 없이 더 가까이 청소합니다." }
            ]
        }
    },
    {
        "id": "narwal-flow-2",
        "typeId": "type2",
        "manufacturer": "Narwal",
        "name": "Flow 2",
        "country": "China",
        "overview": "Prioritizing mopping quality with high-speed scrubbing and fresh water cycling.\n\n[KR] 고속 스크러빙과 신선한 물 순환으로 걸레질 품질을 최우선으로 합니다.",
        "analysis": {
            "intro": "Hygienic Mopping\n[KR] 위생적 물걸레질",
            "points": [
                { "title": "DirtSense", "content": "Sensors detect how dirty the water being sucked up is, automatically re-mopping areas until clean.\n\n[KR] 흡입되는 물의 오염도를 센서가 감지하여 깨끗해질 때까지 자동으로 해당 구역을 다시 닦습니다." },
                { "title": "Quiet Scrub", "content": "Mechanisms oscillate at high frequencies but low decibels, allowing deep cleaning while you watch TV.\n\n[KR] 높은 진동수지만 낮은 데시벨로 작동하여 TV를 시청하는 동안에도 심층 청소가 가능합니다." }
            ]
        }
    },
    {
        "id": "switchbot-kata",
        "typeId": "type3",
        "manufacturer": "SwitchBot",
        "name": "KATA Friends",
        "country": "China",
        "overview": "A series of AI-powered talking plush toys that act as soft interfaces for smart home control and companionship.\n\n[KR] 스마트 홈 제어 및 교감을 위한 부드러운 인터페이스 역할을 하는 AI 기반 음성 인식 봉제 인형 시리즈입니다.",
        "analysis": {
            "intro": "Soft Interface\n[KR] 소프트 인터페이스",
            "points": [
                { "title": "Squeeze Control", "content": "Commands can be triggered by squeezing or hugging the toy, replacing cold buttons with tactile warmth.\n\n[KR] 차가운 버튼 대신 인형을 쥐거나 안아주는 것으로 명령을 실행할 수 있어 촉각적 따뜻함을 제공합니다." },
                { "title": "Persona Variety", "content": "Each character has a distinct voice and personality, changing 'commanding a device' into 'asking a friend'.\n\n[KR] 각 캐릭터는 독특한 목소리와 성격을 가지고 있어 '기기에 명령하는 것'을 '친구에게 부탁하는 것'으로 변화시킵니다." }
            ]
        }
    },
    {
        "id": "roborock-saros",
        "typeId": "type2",
        "manufacturer": "Roborock",
        "name": "Saros Z70",
        "country": "China",
        "overview": "A hybrid cleaning robot with a chassis that lifts on wheels to climb obstacles and stairs, redefining mobility.\n\n[KR] 장애물과 계단을 오르기 위해 바퀴로 섀시를 들어 올리는 하이브리드 청소 로봇으로, 이동성을 재정의합니다.",
        "analysis": {
            "intro": "Vertical Cleaning\n[KR] 수직 청소",
            "points": [
                { "title": "Active Lift", "content": "The entire body lifts up to clear thresholds up to 4cm and climb standard stairs.\n\n[KR] 본체 전체가 들어 올려져 최대 4cm 문턱을 넘고 표준 계단을 오를 수 있습니다." },
                { "title": "Dual-Camera VSLAM", "content": "Uses stereo cameras to identify furniture types and clean accordingly (e.g., under sofas).\n\n[KR] 스테레오 카메라를 사용하여 가구 유형을 식별하고 그에 맞춰(예: 소파 아래) 청소합니다." }
            ]
        }
    }
];

function run() {
    let raw = fs.readFileSync(REPORT_PATH, 'utf8');
    if (raw.charCodeAt(0) === 0xFEFF) raw = raw.slice(1);
    let data = JSON.parse(raw);

    // Process each mapping
    for (const [folder, productId] of Object.entries(mapping)) {
        const srcDir = path.join(IMG_SOURCE_DIR, folder);
        if (!fs.existsSync(srcDir)) {
            console.warn(`Source folder not found: ${srcDir}`);
            continue;
        }

        const destDir = path.join(IMG_DEST_ROOT, productId);
        // Create destination directory
        if (!fs.existsSync(destDir)) {
            fs.mkdirSync(destDir, { recursive: true });
        }

        // Copy files
        const files = fs.readdirSync(srcDir);
        const newImages = [];
        let counter = 1;

        files.forEach(file => {
            if (file.match(/\.(jpg|jpeg|png|webp|gif)$/i)) {
                const ext = path.extname(file);
                const newFileName = `${productId}_${counter}${ext}`;
                const destFile = path.join(destDir, newFileName);

                // Only copy, do not delete source (safe)
                fs.copyFileSync(path.join(srcDir, file), destFile);

                const webPath = `/images/products/${productId}/${newFileName}`;
                newImages.push(webPath);
                counter++;
            }
        });

        if (newImages.length === 0) {
            console.warn(`No images found in ${srcDir}`);
            continue;
        }

        // Find product in reportData or restore it
        let product = data.products.find(p => p.id === productId);

        if (!product) {
            console.log(`Restoring product: ${productId}`);
            const restoreData = productsToRestore.find(p => p.id === productId);
            if (restoreData) {
                product = { ...restoreData };
                data.products.push(product);
            } else {
                console.warn(`No restore data found for ${productId}`);
                continue; // Skip if we don't have data
            }
        } else {
            console.log(`Updating product: ${productId}`);
        }

        // Update images
        product.images = newImages;
        product.videoUrl = product.videoUrl || ""; // Ensure videoUrl exists
    }

    // Write back
    fs.writeFileSync(REPORT_PATH, JSON.stringify(data, null, 2), 'utf8');
    console.log("Completed image restoration and product updates.");
}

run();
