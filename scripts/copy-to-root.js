const fs = require('node:fs');
const path = require('node:path');

// Function to copy directory recursively
function copyDir(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// Function to copy file
function copyFile(src, dest) {
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    return true;
  }
  return false;
}

try {
  const outDir = path.join(process.cwd(), 'out');
  const rootDir = process.cwd();

  // Ensure out directory exists
  if (!fs.existsSync(outDir)) {
    console.error('Error: out directory does not exist. Make sure to run this after next build.');
    process.exit(1);
  }

  console.log('📂 Copying build files to repository root for GitHub Pages branch deployment...');

  // Copy essential files and directories
  const filesToCopy = ['index.html', '404.html', 'CNAME', 'favicon.ico', 'robots.txt', 'sitemap.xml'];

  const dirsToCopy = [
    '_next',
    'images',
    'about',
    'apply',
    'business-loans',
    'calculator',
    'contact',
    'faq',
    'investment-loans',
    'loan-products',
    'rates',
    'resources',
  ];

  // Copy files
  for (const file of filesToCopy) {
    const srcPath = path.join(outDir, file);
    const destPath = path.join(rootDir, file);

    if (copyFile(srcPath, destPath)) {
      console.log(`✅ Copied ${file}`);
    } else if (file === 'CNAME') {
      // Try copying CNAME from public directory if not in out directory
      const publicCNAME = path.join(rootDir, 'public', 'CNAME');
      if (copyFile(publicCNAME, destPath)) {
        console.log(`✅ Copied ${file} from public directory`);
      }
    }
  }

  // Copy directories
  for (const dir of dirsToCopy) {
    const srcPath = path.join(outDir, dir);
    const destPath = path.join(rootDir, dir);

    if (fs.existsSync(srcPath)) {
      // Remove existing directory if it exists
      if (fs.existsSync(destPath)) {
        fs.rmSync(destPath, { recursive: true, force: true });
      }

      copyDir(srcPath, destPath);
      console.log(`✅ Copied ${dir}/`);
    }
  }

  // Create .nojekyll file to prevent GitHub from processing the site with Jekyll
  const nojekyllPath = path.join(rootDir, '.nojekyll');
  fs.writeFileSync(nojekyllPath, '');
  console.log('✅ Created .nojekyll file');

  console.log('🎉 Successfully copied all files to repository root!');
  console.log('💡 Your site is now ready for GitHub Pages branch deployment.');
} catch (error) {
  console.error('Error copying files to root:', error);
  process.exit(1);
}
