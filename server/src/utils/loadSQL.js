import { readFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function loadSQL(filename) {
  const fullPath = path.join(__dirname, '..', 'data', 'queries', filename);
  return await readFile(fullPath, 'utf-8');
}
