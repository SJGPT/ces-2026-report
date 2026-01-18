const fs = require('fs');
const path = 'src/data/reportData.json';

try {
    let raw = fs.readFileSync(path, 'utf8');

    // Strip BOM if present
    if (raw.charCodeAt(0) === 0xFEFF) {
        raw = raw.slice(1);
    }

    const data = JSON.parse(raw);

    if (data.products && Array.isArray(data.products)) {
        const originalCount = data.products.length;
        const itemsToRemove = [];

        data.products = data.products.filter(p => {
            // Check if product has valid images
            const hasValidImage = p.images && p.images.length > 0 && p.images.some(img => img !== '/images/placeholder_robot.png');

            if (!hasValidImage) {
                itemsToRemove.push(p.id);
                return false;
            }
            return true;
        });

        console.log(`Original count: ${originalCount}`);
        console.log(`New count: ${data.products.length}`);
        console.log(`Removed ${itemsToRemove.length} items:`, itemsToRemove.join(', '));
    }

    fs.writeFileSync(path, JSON.stringify(data, null, 2), 'utf8');
    console.log('Successfully filtered products.');

} catch (e) {
    console.error('Error processing file:', e);
    process.exit(1);
}
