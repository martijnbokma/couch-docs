import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Krijg het huidige bestandspad
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Regex pattern voor bestandsnamen (zelfde als in .markdownlint.json)
const filePattern = /\b[\w.-]+\.(php|html|js|css|md|mdx|json|yml|yaml)\b/g;

function wrapFilenamesInBackticks(content) {
  // Split content op code blocks, maar behoud de delimiters
  const parts = content.split(/(```(?:[\w-]+)?\n[\s\S]*?```)/);
  
  // Process alleen de non-code blocks (even indices)
  return parts.map((part, index) => {
    if (index % 2 === 0) {
      // Negeer bestandsnamen die al in backticks staan
      return part.replace(/(?<!`)([\w.-]+\.(php|html|js|css|md|mdx|json|yml|yaml))(?!`)/g, '`$1`');
    }
    // Behoud code blocks ongewijzigd (oneven indices)
    return part;
  }).join('');
}

function processFile(filePath) {
  console.log(`Verwerken van: ${filePath}`);
  const content = fs.readFileSync(filePath, 'utf8');
  const updatedContent = wrapFilenamesInBackticks(content);
  
  if (content !== updatedContent) {
    fs.writeFileSync(filePath, updatedContent);
    console.log(`✓ Bestandsnamen in backticks gezet in: ${filePath}`);
  }
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      walkDir(filePath);
    } else if (file.endsWith('.mdx')) {
      processFile(filePath);
    }
  });
}

// Maak de scripts directory als deze nog niet bestaat
if (!fs.existsSync('scripts')) {
  fs.mkdirSync('scripts');
}

// Start verwerking vanaf docs directory
console.log('Start verwerking van markdown bestanden...');
const docsDir = path.join(process.cwd(), 'src/content/docs');
walkDir(docsDir);
console.log('Klaar met verwerken van bestanden.'); 