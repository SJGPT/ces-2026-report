
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { reportData } from '../src/data/reportData.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const jsonPath = path.join(__dirname, '../src/data/reportData.json');

console.log('Converting data to JSON...');
fs.writeFileSync(jsonPath, JSON.stringify(reportData, null, 2));
console.log('Done! Saved to src/data/reportData.json');
