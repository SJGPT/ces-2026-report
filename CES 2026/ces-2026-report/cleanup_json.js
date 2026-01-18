const fs = require('fs');
const path = 'src/data/reportData.json';

try {
    let raw = fs.readFileSync(path, 'utf8');

    // Strip BOM
    if (raw.charCodeAt(0) === 0xFEFF) {
        raw = raw.slice(1);
    }

    // Fix syntax errors
    raw = raw.replace(/,"points":/g, '", "points":');
    raw = raw.replace(/"videoUrl": ""{/g, '"videoUrl": ""\n    },\n    {');

    // Remove lines that are just a comma (likely double commas)
    // Be careful not to remove valid comma separators if formatted oddly
    // But usually }, is on one line.
    raw = raw.replace(/^\s*,\s*$/gm, '');

    // Attempt to parse JSON
    let data;
    try {
        data = JSON.parse(raw);
    } catch (parseError) {
        console.error("JSON Parse Error:", parseError.message);
        // Print context of error
        const match = parseError.message.match(/at position (\d+)/);
        if (match) {
            const pos = parseInt(match[1]);
            console.log("Context:", raw.substring(pos - 50, pos + 50));
        }
        process.exit(1);
    }

    // Filter products
    if (data.products && Array.isArray(data.products)) {
        const originalCount = data.products.length;
        data.products = data.products.filter(p => {
            if (p.id === 'widemount-firefighting') return false;
            if (p.id === 'oshkosh-jlg') return false;
            if (p.id === 'samsung-oled-cassette') return false;
            if (p.id === 'samsung-ai-oled-bot' && p.typeId === 'type3') return false;
            if (p.id === 'olloni-cyberpet' && p.typeId === 'type3') return false;
            return true;
        });
        console.log(`Removed ${originalCount - data.products.length} items.`);
    }

    fs.writeFileSync(path, JSON.stringify(data, null, 2), 'utf8');
    console.log('Success');
} catch (e) {
    console.error(e);
}
