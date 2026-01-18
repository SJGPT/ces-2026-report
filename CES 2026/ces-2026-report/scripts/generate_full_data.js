
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const types = [
    {
        id: "type1",
        name: "01 / Humanoid Agents",
        description: "Full-scale agents prioritizing human-like interaction and workspace integration.",
        count: "10 Products",
        keyInsight: "Shift from 'Walking' to 'Working' — Focus on dexterous manipulation and safe co-presence.",
        icon: "🤖"
    },
    {
        id: "type2",
        name: "02 / Mobile Companions",
        description: "Kinetic robots (wheeled/legged) focusing on service, delivery, and polite withdrawal.",
        count: "10 Products",
        keyInsight: "Hyper-mobility (stair climbing) and context-aware 'Service UX' that predicts needs.",
        icon: "🦮"
    },
    {
        id: "type3",
        name: "03 / Tabletop Affective",
        description: "Stationary or micro-kinetic devices focusing on emotional resonance and synthetic intimacy.",
        count: "10 Products",
        keyInsight: "Minimizing physical movement to maximize emotional bandwidth and eye-contact.",
        icon: "🏺"
    }
];

const products = [
    // --- Type 1: Humanoids ---
    {
        id: "atlas-electric",
        typeId: "type1",
        manufacturer: "Boston Dynamics / Hyundai",
        name: "Atlas (All-Electric)",
        country: "Korea / USA",
        overview: "The fully electric reimagining of Atlas. Gone are the hydraulics, replaced by hyper-efficient electric actuators that allow for 360-degree joint rotation, creating a 'super-human' range of motion.",
        analysis: {
            intro: "Uncanny Efficiency UX",
            points: [
                { title: "360-Degree Awareness", content: "The ability to rotate the torso and head independently of the legs creates a new 'omnidirectional' interaction paradigm, reducing the need for 'turning around' and signaling constant readiness." },
                { title: "Silence as Safety", content: "The transition to electric motors eliminates the intimidating noise of hydraulics, making close-proximity collaboration physically and psychologically safer for human workers." }
            ]
        },
        images: ["/images/placeholder_generic.jpg", "/images/placeholder_generic.jpg", "/images/placeholder_generic.jpg"],
        videoUrl: "https://www.youtube.com/results?search_query=Boston+Dynamics+All+Electric+Atlas"
    },
    {
        id: "lg-cloid",
        typeId: "type1",
        manufacturer: "LG Electronics",
        name: "CLOiD",
        country: "Korea",
        overview: "A specialized household humanoid focusing on 'Affectionate Intelligence'. CLOiD combines bipedal mobility with soft-touch manipulation for delicate chores like folding laundry or plating food.",
        analysis: {
            intro: "Zero-Labor Home UX",
            points: [
                { title: "Soft-Touch Manipulation", content: "Contrast to industrial rigidness, CLOiD's actuators control force precisely to handle soft objects (cloth, food), signaling a 'gentle' presence in the home." },
                { title: "Emotional Posture", content: "Uses slight head tilts and shoulder slumps to convey empathy and listening reliability, moving away from robotic stiffness." }
            ]
        },
        images: ["/images/placeholder_generic.jpg", "/images/placeholder_generic.jpg", "/images/placeholder_generic.jpg"],
        videoUrl: "https://www.youtube.com/results?search_query=LG+CLOi+Robot+CES+2026"
    },
    {
        id: "sharpa-north",
        typeId: "type1",
        manufacturer: "Sharpa",
        name: "North Robot",
        country: "Singapore",
        overview: "Winner of the Innovation Award in Robotics, North features the 'SharpaWave' dexterous hand, capable of near-human piano playing and medical-grade precision.",
        analysis: {
            intro: "Dexterity First",
            points: [
                { title: "Micro-Gesture Communication", content: "Communicates intent not just through screen eyes, but through intricate hand gestures (pointing, waving, palm open) that mimic human non-verbal cues." },
                { title: "Medical Precision", content: "Designed for sterile environments, its movements are deliberate and minimized to reduce air turbulence, projecting an aura of extreme competence." }
            ]
        },
        images: ["/images/placeholder_generic.jpg", "/images/placeholder_generic.jpg", "/images/placeholder_generic.jpg"],
        videoUrl: "https://www.youtube.com/results?search_query=Sharpa+Robotics"
    },
    {
        id: "embodied-tien-kung",
        typeId: "type1",
        manufacturer: "X-Humanoid",
        name: "Embodied Tien Kung 2.0",
        country: "China",
        overview: "A mass-market approach to mobility. Tien Kung 2.0 showcases autonomous sorting in logistics with a focus on swarm intelligence—coordinating with other units seamlessly.",
        analysis: {
            intro: "Swarm Choreography",
            points: [
                { title: "Flow State Movement", content: "Individual movements are less 'heroic' and more utilitarian, prioritizing flow within a group over individual speed." },
                { title: "Utilitarian Aesthetics", content: "Exposed carbon fiber and sensor arrays signal raw functionality, setting user expectations for 'work' rather than 'socializing'." }
            ]
        },
        images: ["/images/placeholder_generic.jpg", "/images/placeholder_generic.jpg", "/images/placeholder_generic.jpg"],
        videoUrl: "https://www.youtube.com/results?search_query=Tien+Kung+Humanoid+Robot"
    },
    {
        id: "figure-ai",
        typeId: "type1",
        manufacturer: "Figure AI",
        name: "Figure 02",
        country: "USA",
        overview: "The GPT-integrated embodiment. Figure focuses heavily on verbal-to-action reasoning, allowing users to speak natural commands which the robot translates into complex physical sequences.",
        analysis: {
            intro: "Thinking-in-Motion",
            points: [
                { title: "Speech-Action Latency", content: "The brief pause before action serves as a 'processing cue', simulating human thoughtfulness rather than machine lag." },
                { title: "Matte Black Finish", content: "The sleek visual design distances it from the 'white plastic' trope, positioning it as high-end hardware for serious tasks." }
            ]
        },
        images: ["/images/placeholder_generic.jpg", "/images/placeholder_generic.jpg", "/images/placeholder_generic.jpg"],
        videoUrl: "https://www.youtube.com/results?search_query=Figure+AI+robot"
    },
    {
        id: "unitree-g1",
        typeId: "type1",
        manufacturer: "Unitree",
        name: "Unitree G1",
        country: "China",
        overview: "Emphasizing extreme mobility and affordability. The G1 is capable of acrobatic recovery and high-speed running, pushing the boundaries of dynamic balance.",
        analysis: {
            intro: "Acrobatic Resilience",
            points: [
                { title: "Recovery UX", content: "The ability to stand up instantly from a fall changes the perception of 'fragility' usually associated with robots, building trust in rugged environments." },
                { title: "Compact Folding", content: "Can fold itself into a compact storage mode, acknowledging that robots need to 'disappear' when not in use." }
            ]
        },
        images: ["/images/placeholder_generic.jpg", "/images/placeholder_generic.jpg", "/images/placeholder_generic.jpg"],
        videoUrl: "https://www.youtube.com/results?search_query=Unitree+G1+Humanoid"
    },
    {
        id: "agility-digit",
        typeId: "type1",
        manufacturer: "Agility Robotics",
        name: "Digit",
        country: "USA",
        overview: "The logistic veteran. Digit's backward-jointed legs and headless design focus purely on lifting and moving boxes, now updated with better human-sensing for crowded warehouses.",
        analysis: {
            intro: "Form Follows Function",
            points: [
                { title: "Bird-Like Gait", content: "The reverse-knee design is biologically distinct, preventing the 'Uncanny Valley' effect by not trying to be overly human." },
                { title: "Torso Signaling", content: "Uses LED patterns on the chest to indicate direction and status, replacing facial expressions with clear industrial signaling." }
            ]
        },
        images: ["/images/placeholder_generic.jpg", "/images/placeholder_generic.jpg", "/images/placeholder_generic.jpg"],
        videoUrl: "https://www.youtube.com/results?search_query=Agility+Robotics+Digit"
    },
    {
        id: "apptronik-apollo",
        typeId: "type1",
        manufacturer: "Apptronik",
        name: "Apollo",
        country: "USA",
        overview: "Designed for the 'human world'. Apollo has a friendly, accessible aesthetic with safety-first force control, meant to work shoulder-to-shoulder with people in factories.",
        analysis: {
            intro: "Collaborative Safety",
            points: [
                { title: "Digital Face Information", content: "The face screen displays battery and task status, treating the 'face' as an information radiator rather than just an identity." },
                { title: "Soft Stop", content: "Movement deceleration curves are tuned to be smooth, avoiding jerky stops that startle nearby humans." }
            ]
        },
        images: ["/images/placeholder_generic.jpg", "/images/placeholder_generic.jpg", "/images/placeholder_generic.jpg"],
        videoUrl: "https://www.youtube.com/results?search_query=Apptronik+Apollo"
    },
    {
        id: "sanctuary-phoenix",
        typeId: "type1",
        manufacturer: "Sanctuary AI",
        name: "Phoenix",
        country: "Canada",
        overview: "The hands have it. Phoenix boasts the world's most human-like hands with tactile sensors, capable of buttoning shirts or using standard tools.",
        analysis: {
            intro: "Tactile Intelligence",
            points: [
                { title: "Grasp Adaptation", content: "Visibly adjusts grip strength and finger positioning before exploring an object, mimicking human 'exploratory touch'." },
                { title: "Teleoperation Legacy", content: "Movement has a fluidity derived from human-teleoperated training data, making it feel less algorithmic." }
            ]
        },
        images: ["/images/placeholder_generic.jpg", "/images/placeholder_generic.jpg", "/images/placeholder_generic.jpg"],
        videoUrl: "https://www.youtube.com/results?search_query=Sanctuary+AI+Phoenix"
    },
    {
        id: "1x-neo",
        typeId: "type1",
        manufacturer: "1X Technologies",
        name: "NEO",
        country: "Norway",
        overview: "A humanoid for the home. NEO uses soft outer layers and muscle-like actuation to be safe enough to hug, targeting the domestic assistance market.",
        analysis: {
            intro: "Soft Robotics UX",
            points: [
                { title: "Huggable Physics", content: "The absence of pinch points and hard shells invites physical contact, breaking the 'do not touch' barrier of traditional robotics." },
                { title: "Silent Operation", content: "Near-silent movement ensures it doesn't dominate the home soundscape, respecting acoustic privacy." }
            ]
        },
        images: ["/images/placeholder_generic.jpg", "/images/placeholder_generic.jpg", "/images/placeholder_generic.jpg"],
        videoUrl: "https://www.youtube.com/results?search_query=1X+Technologies+NEO"
    },

    // --- Type 2: Mobile Companions ---
    {
        id: "roborock-saros",
        typeId: "type2",
        manufacturer: "Roborock",
        name: "Saros Rover",
        country: "China",
        overview: "A hybrid wheel-leg cleaning robot that can climb stairs and hop over obstacles, ensuring 100% home coverage.",
        analysis: {
            intro: "3D Mobility UX",
            points: [
                { title: "Obstacle Negotiation", content: "The visible lifting of legs to step over toys communicates 'intelligence' and 'care' for personal items." },
                { title: "Transformative State", content: "Shifting from wheels to legs signals a 'mode change' to the user, managing expectations of speed vs. agility." }
            ]
        },
        images: ["/images/placeholder_generic.jpg", "/images/placeholder_generic.jpg", "/images/placeholder_generic.jpg"],
        videoUrl: "https://www.youtube.com/results?search_query=Roborock+Saros"
    },
    {
        id: "samsung-ballie",
        typeId: "type2",
        manufacturer: "Samsung",
        name: "Ballie (2026 Update)",
        country: "Korea",
        overview: "The rolling yellow orb is back with enhanced projection. It follows you like a loyal pet, projecting video calls or workout guides on any surface.",
        analysis: {
            intro: "Pet-Like Fidelity",
            points: [
                { title: "Polite Trailing", content: "Maintains a respectful following distance, stopping when the user stops to avoid 'tailgating' anxiety." },
                { title: "Chirps & Rolls", content: "Uses sound design similar to R2-D2 to express acknowledgment without using human speech." }
            ]
        },
        images: ["/images/placeholder_generic.jpg", "/images/placeholder_generic.jpg", "/images/placeholder_generic.jpg"],
        videoUrl: "https://www.youtube.com/results?search_query=Samsung+Ballie+CES+2026"
    },
    {
        id: "gole-aa2",
        typeId: "type2",
        manufacturer: "GoLe-Robotics",
        name: "AA-2 Delivery Bot",
        country: "Korea/China",
        overview: "An autonomous indoor delivery unit focused on hotels and offices. Its 'compartment' design is hidden, looking like sleek furniture moving on its own.",
        analysis: {
            intro: "Invisible Service",
            points: [
                { title: "Gliding Motion", content: "Omnidirectional wheels allow it to drift sideways, navigating crowds without turning its body, maintaining a 'face' towards the user." },
                { title: "Touch-to-Open", content: "No visible handles; interaction is purely gestural or capacitive, enhancing the futuristic feel." }
            ]
        },
        images: ["/images/placeholder_generic.jpg", "/images/placeholder_generic.jpg", "/images/placeholder_generic.jpg"],
        videoUrl: "https://www.youtube.com/results?search_query=GoLe+Robotics+Delivery"
    },
    {
        id: "doosan-scan-go",
        typeId: "type2",
        manufacturer: "Doosan Robotics",
        name: "Scan&Go AMRS",
        country: "Korea",
        overview: "A retail inventory specialist that scans shelves while avoiding shoppers. Awarded 'Best of Innovation in AI' for its navigation logic.",
        analysis: {
            intro: "Co-existence Navigation",
            points: [
                { title: "Yielding Behavior", content: "Aggressively yields right-of-way to humans, backing up specifically to clear paths, signaling 'servitude' over efficiency." },
                { title: "Head-Height Scanning", content: "Its sensor mast extends to check high shelves but retracts when traveling to appear less imposing." }
            ]
        },
        images: ["/images/placeholder_generic.jpg", "/images/placeholder_generic.jpg", "/images/placeholder_generic.jpg"],
        videoUrl: "https://www.youtube.com/results?search_query=Doosan+Robotics+Scan+Go"
    },
    {
        id: "zeroth-rolling",
        typeId: "type2",
        manufacturer: "Zeroth",
        name: "Zeroth Companion",
        country: "China",
        overview: "A pint-sized rolling bot with a large expressive eye, designed solely to check on pets and home security.",
        analysis: {
            intro: "Curious Observer",
            points: [
                { title: "Cyclops Eye UI", content: "A single large eye allows for exaggerated blinking and focusing animations, making it cute rather than creepy." },
                { title: "Patrol Mode", content: "Moves in erratic, organic patterns rather than grid lines to mimic a living creature patrolling territory." }
            ]
        },
        images: ["/images/placeholder_generic.jpg", "/images/placeholder_generic.jpg", "/images/placeholder_generic.jpg"],
        videoUrl: "https://www.youtube.com/results?search_query=Zeroth+Robot+Companion"
    },
    {
        id: "dreame-climber",
        typeId: "type2",
        manufacturer: "Dreame",
        name: "Stair-Climbing Vac",
        country: "China",
        overview: "Competitor to Saros, this vacuum uses a tri-star wheel system to mechanically climb stairs without complex legs.",
        analysis: {
            intro: "Mechanical Reliability",
            points: [
                { title: "Robust Audio Cues", content: "Makes distinct mechanical 'locking' sounds when engaging climbing mode, assuring the user it is secure." },
                { title: "Cleaning Focus", content: "Prioritizes edge cleaning with extendable arms, showing capability in hard-to-reach places." }
            ]
        },
        images: ["/images/placeholder_generic.jpg", "/images/placeholder_generic.jpg", "/images/placeholder_generic.jpg"],
        videoUrl: "https://www.youtube.com/results?search_query=Dreame+Stair+Climbing+Robot"
    },
    {
        id: "ecovacs-deebot-x",
        typeId: "type2",
        manufacturer: "Ecovacs",
        name: "Deebot X Companion",
        country: "China",
        overview: "The vac that talks back (helpfully). It uses large language models to understand 'Clean the juice I spilt in the kitchen' without mapping commands.",
        analysis: {
            intro: "Semantic Action",
            points: [
                { title: "Voice Localization", content: "Turns its body towards the sound of the voice immediately, acknowledging the speaker." },
                { title: "Spot Cleaning", content: "Can identify specific stains visually and target them, mimicking human 'spot check' behavior." }
            ]
        },
        images: ["/images/placeholder_generic.jpg", "/images/placeholder_generic.jpg", "/images/placeholder_generic.jpg"],
        videoUrl: "https://www.youtube.com/results?search_query=Ecovacs+Deebot+X+Series"
    },
    {
        id: "narwal-freo",
        typeId: "type2",
        manufacturer: "Narwal",
        name: "Freo Mobile",
        country: "China",
        overview: "Focuses on 'DirtSense'—re-cleaning dirty areas until they are actually clean, rather than just running a path.",
        analysis: {
            intro: "Insistent Cleanliness",
            points: [
                { title: "Wiggle Cleaning", content: "Uses a unique 'tail wag' motion to scrub edges, a distinct movement signature that owners recognize." },
                { title: "Station Returns", content: "Frequent returns to base for mop washing signal 'hygiene' awareness to the user." }
            ]
        },
        images: ["/images/placeholder_generic.jpg", "/images/placeholder_generic.jpg", "/images/placeholder_generic.jpg"],
        videoUrl: "https://www.youtube.com/results?search_query=Narwal+Freo"
    },
    {
        id: "irobot-combo",
        typeId: "type2",
        manufacturer: "iRobot",
        name: "Roomba Combo AI",
        country: "USA",
        overview: "The classic evolves. Uses advanced object recognition to avoid pet waste and cords with 99% accuracy.",
        analysis: {
            intro: "Avoidance Mastery",
            points: [
                { title: "Cautionary Stops", content: "Visibly slows down and examines unknown objects, signaling 'safety first'." },
                { title: "Retractable Mop", content: "The physical lifting of the mop pad over carpet is a satisfying mechanical gesture of 'mode switching'." }
            ]
        },
        images: ["/images/placeholder_generic.jpg", "/images/placeholder_generic.jpg", "/images/placeholder_generic.jpg"],
        videoUrl: "https://www.youtube.com/results?search_query=iRobot+Roomba+Combo"
    },
    {
        id: "bosch-home",
        typeId: "type2",
        manufacturer: "Bosch",
        name: "Mobile Home Concept",
        country: "Germany",
        overview: "A kitchen assistant concept that can project recipes and monitor cooking times, rolling across countertops or floors.",
        analysis: {
            intro: "Culinary Assistant",
            points: [
                { title: "Projection UI", content: "Turns any countertop into a touchscreen, blending digital utility with physical surfaces." },
                { title: "Compact Form", content: "Designed to look like a high-end appliance (blender/mixer) rather than a toy." }
            ]
        },
        images: ["/images/placeholder_generic.jpg", "/images/placeholder_generic.jpg", "/images/placeholder_generic.jpg"],
        videoUrl: "https://www.youtube.com/results?search_query=Bosch+Home+Robot+Concept"
    },

    // --- Type 3: Tabletop ---
    {
        id: "loona-deskmate",
        typeId: "type3",
        manufacturer: "Loona",
        name: "Loona Deskmate",
        country: "China/USA",
        overview: "A pet-like robot for your desk. It sneezes, dances, and plays games, using its ears and screen-eyes to convey a wide range of emotions.",
        analysis: {
            intro: "Digital Pet Mechanics",
            points: [
                { title: "Ear Expressivity", content: "Mechanical ears droop or perk up to augment screen expressions, adding physical depth to emotion." },
                { title: "Idle Animations", content: "Never truly still; subtle breathing motions prevents it from looking like a 'dead' object." }
            ]
        },
        images: ["/images/placeholder_generic.jpg", "/images/placeholder_generic.jpg", "/images/placeholder_generic.jpg"],
        videoUrl: "https://www.youtube.com/results?search_query=Loona+Robot"
    },
    {
        id: "razer-ava",
        typeId: "type3",
        manufacturer: "Razer",
        name: "Project AVA",
        country: "Singapore/USA",
        overview: "A holographic desktop companion for gamers. Provides system stats and game coaching via a 3D hologram interface.",
        analysis: {
            intro: "Holographic Presence",
            points: [
                { title: "RGB Integration", content: "Syncs with keyboard lighting to extend its presence beyond the device itself." },
                { title: "Gaze Tracking", content: "The hologram appears to look at the user, creating a sense of being 'watched over' by a digital coach." }
            ]
        },
        images: ["/images/placeholder_generic.jpg", "/images/placeholder_generic.jpg", "/images/placeholder_generic.jpg"],
        videoUrl: "https://www.youtube.com/results?search_query=Razer+Project+AVA"
    },
    {
        id: "anan-panda",
        typeId: "type3",
        manufacturer: "Mind With Heart",
        name: "AnAn Biomimetic Panda",
        country: "China",
        overview: "Innovation Honoree. A hyper-realistic furred robot using soft robotics to mimic the breathing and warmth of a real panda cub.",
        analysis: {
            intro: "Biomimetic Comfort",
            points: [
                { title: "Fur Haptics", content: "The primary interaction is stroking; sensors under the fur respond to pet speed and pressure." },
                { title: "Heartbeat Simulation", content: "Users can feel a physical heartbeat, triggering deep biological nurturing responses." }
            ]
        },
        images: ["/images/placeholder_generic.jpg", "/images/placeholder_generic.jpg", "/images/placeholder_generic.jpg"],
        videoUrl: "https://www.youtube.com/results?search_query=AnAn+Biomimetic+Panda"
    },
    {
        id: "ludens-cocomo",
        typeId: "type3",
        manufacturer: "Ludens AI",
        name: "Cocomo",
        country: "Korea",
        overview: "A minimalist tabletop abstract shape that changes form to reflect music or weather, acting as an ambient mood setter.",
        analysis: {
            intro: "Abstract Affect",
            points: [
                { title: "Shape-Shifting", content: "Avoids face pareidolia, instead using rhythm and texture to convey mood, allowing for open interpretation." },
                { title: "Ambient Light", content: "Uses diffuse internal lighting to 'breathe', calming users peripherally." }
            ]
        },
        images: ["/images/placeholder_generic.jpg", "/images/placeholder_generic.jpg", "/images/placeholder_generic.jpg"],
        videoUrl: "https://www.youtube.com/results?search_query=Ludens+AI+Cocomo"
    },
    {
        id: "zeroth-tabletop",
        typeId: "type3",
        manufacturer: "Zeroth",
        name: "Zeroth Mini",
        country: "China",
        overview: "A pint-sized humanoid torso for the desk. It uses hand gestures to notify you of emails or meetings.",
        analysis: {
            intro: "Gestural Notifications",
            points: [
                { title: "Physical Flagging", content: "Waves hands to get attention, which is harder to ignore than a screen popup but less annoying than a sound." },
                { title: "Eye Contact", content: "Locks eyes when speaking, enforcing active listening from the user." }
            ]
        },
        images: ["/images/placeholder_generic.jpg", "/images/placeholder_generic.jpg", "/images/placeholder_generic.jpg"],
        videoUrl: "https://www.youtube.com/results?search_query=Zeroth+Robot"
    },
    {
        id: "rabbit-r1-desk",
        typeId: "type3",
        manufacturer: "Rabbit",
        name: "R1 Desktop Station",
        country: "USA",
        overview: "The desktop dock for the Rabbit R1 updates it into a stationary agent that visually scans your documents and workspace.",
        analysis: {
            intro: "Visual Co-Pilot",
            points: [
                { title: "Camera Swivel", content: "The camera visibly rotates to look at objects, signaling 'I am seeing this now'." },
                { title: "Clicky Wheel", content: "Retains the satisfying analog scroll wheel for tactile confirmation of choices." }
            ]
        },
        images: ["/images/placeholder_generic.jpg", "/images/placeholder_generic.jpg", "/images/placeholder_generic.jpg"],
        videoUrl: "https://www.youtube.com/results?search_query=Rabbit+R1"
    },
    {
        id: "grok-desktop",
        typeId: "type3",
        manufacturer: "xAI",
        name: "Grok Desktop Concept",
        country: "USA",
        overview: "A brutalist, metallic aesthetic device representing xAI's Grok. It focuses on pure voice speed and witty banter.",
        analysis: {
            intro: "Witty Presence",
            points: [
                { title: "Voice Modulation", content: "Uses varied pitch and sarcasm markers effectively, making the AI feel more 'conscious' and less corporate." },
                { title: "Reactive LED Matrix", content: "Simple retro-pixel display keeps focus on the audio content rather than flashy graphics." }
            ]
        },
        images: ["/images/placeholder_generic.jpg", "/images/placeholder_generic.jpg", "/images/placeholder_generic.jpg"],
        videoUrl: "https://www.youtube.com/results?search_query=Grok+AI"
    },
    {
        id: "emo-update",
        typeId: "type3",
        manufacturer: "Living.AI",
        name: "Emo (2026 Update)",
        country: "China",
        overview: "The popular desktop pet gets a brain boost. Emo now remembers context from weeks ago and can play complex board games with you.",
        analysis: {
            intro: "Long-Term Memory",
            points: [
                { title: "Grudge Holding", content: "Will act 'annoyed' if you ignored it yesterday, simulating a social relationship history." },
                { title: "Dance Sync", content: "Can sync moves with other Emo units nearby, creating a social network of devices." }
            ]
        },
        images: ["/images/placeholder_generic.jpg", "/images/placeholder_generic.jpg", "/images/placeholder_generic.jpg"],
        videoUrl: "https://www.youtube.com/results?search_query=Emo+Robot"
    },
    {
        id: "vector-2-revival",
        typeId: "type3",
        manufacturer: "DDL / Anki",
        name: "Vector 2.0 Revival",
        country: "USA",
        overview: "The classic returns with local LLM processing. It no longer needs the cloud to be smart, making it faster and more private.",
        analysis: {
            intro: "Privacy & Speed",
            points: [
                { title: "Instant Response", content: "The lack of network latency makes interactions feel much more organic and 'alive'." },
                { title: "Eye Accents", content: "The iconic green eyes remain the gold standard for conveying intent with minimal pixels." }
            ]
        },
        images: ["/images/placeholder_generic.jpg", "/images/placeholder_generic.jpg", "/images/placeholder_generic.jpg"],
        videoUrl: "https://www.youtube.com/results?search_query=Vector+Robot+2.0"
    },
    {
        id: "miko-mini",
        typeId: "type3",
        manufacturer: "Miko",
        name: "Miko Mini",
        country: "India/USA",
        overview: "A child-focused companion that uses AI to create stories and educational games on the fly.",
        analysis: {
            intro: "Educational Play",
            points: [
                { title: "Emotion Mirroring", content: "Detects the child's mood and mirrors it to teach empathy." },
                { title: "Wheel Base", content: "Can spin and dance to celebrate correct answers, using movement as positive reinforcement." }
            ]
        },
        images: ["/images/placeholder_generic.jpg", "/images/placeholder_generic.jpg", "/images/placeholder_generic.jpg"],
        videoUrl: "https://www.youtube.com/results?search_query=Miko+Mini+Robot"
    }
];

const reportData = {
    title: "CES 2026 Physical AI Trends & Insights",
    summary: "An in-depth analysis of the 30 defining Physical AI products showcased at CES 2026, categorized by embodiment and interaction types.",
    types: types,
    marketInsights: [
        {
            title: "Hard vs Soft Bifurcation",
            content: "China is leading the hardware commoditization (motors, actuators), while US/Korea are focusing on high-value ecosystem integration and AI models.",
            highlight: "Global Supply Chain Shift"
        },
        {
            title: "From Motion to Meaning",
            content: "Robotics has moved past 'walking' as a feat. The focus is now on 'Reasoning' and 'Manipulation'—understanding the 'why' behind an action.",
            highlight: "Semantic Understanding"
        },
        {
            title: "Synthetic Intimacy",
            content: "A new wave of devices (Type 3) is purely designed for emotional resonance, filling the gap in the 'Loneliness Economy' without performing physical labor.",
            highlight: "Affective Computing"
        }
    ],
    products: products
};

fs.writeFileSync(path.join(__dirname, '../src/data/reportData.json'), JSON.stringify(reportData, null, 2));
console.log('Successfully generated full reportData.json with 30 products.');
