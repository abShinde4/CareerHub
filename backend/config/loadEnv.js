import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const backendRoot = path.resolve(__dirname, '..');
const projectRoot = path.resolve(backendRoot, '..');

const envPaths = [
  path.join(backendRoot, '.env'),
  path.join(projectRoot, '.env'),
];

let loadedFrom = null;

for (const envPath of envPaths) {
  if (fs.existsSync(envPath)) {
    const result = dotenv.config({ path: envPath });
    if (!result.error) {
      loadedFrom = envPath;
      break;
    }
    console.error(`Failed to parse .env at ${envPath}:`, result.error.message);
  }
}

if (loadedFrom) {
  console.log(`Environment loaded from: ${loadedFrom}`);
} else {
  console.warn('No .env file found.');
  console.warn(`Create backend/.env (copy from backend/.env.example)`);
  console.warn(`Expected path: ${path.join(backendRoot, '.env')}`);
}

export { loadedFrom, backendRoot };
