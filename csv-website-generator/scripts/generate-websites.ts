// scripts/generate-websites.js
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

// Hero template
const heroTemplate = `'use client'
import React from 'react';

export default function Hero() {
  return (
    <div style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      textAlign: 'center',
      padding: '100px 20px',
      minHeight: '60vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column'
    }}>
      <h1 style={{
        fontSize: '3rem',
        marginBottom: '20px',
        fontWeight: 'bold'
      }}>
        {{ title }}
      </h1>
      <p style={{
        fontSize: '1.2rem',
        maxWidth: '600px',
        lineHeight: '1.6'
      }}>
        [[ Quick | Fast | Speedy | Reliable ]] {{ description }}
      </p>
      <button style={{
        background: '#ff6b6b',
        color: 'white',
        border: 'none',
        padding: '15px 30px',
        fontSize: '1.1rem',
        borderRadius: '25px',
        marginTop: '30px',
        cursor: 'pointer',
        transition: 'transform 0.3s'
      }}>
        Get Started Today
      </button>
    </div>
  );
}`;

// Contact template
const contactTemplate = `'use client'
import React from 'react';

export default function Contact() {
  return (
    <div style={{
      background: '#f8f9fa',
      padding: '80px 20px',
      textAlign: 'center'
    }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        <h2 style={{
          fontSize: '2.5rem',
          marginBottom: '40px',
          color: '#333'
        }}>
          Contact Us
        </h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '40px',
          marginTop: '50px'
        }}>
          <div style={{
            background: 'white',
            padding: '40px',
            borderRadius: '15px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ color: '#667eea', marginBottom: '20px' }}>📞 Phone</h3>
            <p style={{ fontSize: '1.2rem', color: '#333' }}>{{ phone }}</p>
          </div>
          
          <div style={{
            background: 'white',
            padding: '40px',
            borderRadius: '15px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ color: '#667eea', marginBottom: '20px' }}>📍 Address</h3>
            <p style={{ fontSize: '1.1rem', color: '#333' }}>{{ address }}</p>
          </div>
        </div>
      </div>
    </div>
  );
}`;

function processSpinText(text) {
  return text.replace(/\[\[\s*([^|\]]+(?:\s*\|\s*[^|\]]+)*)\s*\]\]/g, (match, options) => {
    const choices = options.split('|').map(choice => choice.trim());
    const randomChoice = choices[Math.floor(Math.random() * choices.length)];
    return randomChoice;
  });
}

function replaceTemplateVars(content, data) {
  return content.replace(/\{\{\s*(\w+)\s*\}\}/g, (match, key) => {
    return data[key] || match;
  });
}

function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

async function generateSingleWebsite(websiteData) {
  const { domain, title, description, phone, address } = websiteData;
  
  console.log(`🔨 Generating website for ${domain}...`);
  
  const siteDir = path.join(__dirname, '..', 'build', domain);
  const srcDir = path.join(siteDir, 'src');
  const appDir = path.join(srcDir, 'app');
  const componentsDir = path.join(srcDir, 'app', 'components');
  
  ensureDirectoryExists(siteDir);
  ensureDirectoryExists(srcDir);
  ensureDirectoryExists(appDir);
  ensureDirectoryExists(componentsDir);
  
  let processedHero = processSpinText(heroTemplate);
  processedHero = replaceTemplateVars(processedHero, websiteData);
  
  let processedContact = replaceTemplateVars(contactTemplate, websiteData);
  
  // Write component files as .tsx (TypeScript)
  fs.writeFileSync(
    path.join(componentsDir, 'Hero.tsx'),
    processedHero
  );
  
  fs.writeFileSync(
    path.join(componentsDir, 'Contact.tsx'),
    processedContact
  );
  
  // Create main page.tsx
  const pageContent = `'use client'
import React from 'react';
import Hero from './components/Hero';
import Contact from './components/Contact';

export default function HomePage() {
  return (
    <div>
      <Hero />
      <Contact />
    </div>
  );
}`;
  
  fs.writeFileSync(path.join(appDir, 'page.tsx'), pageContent);
  
  // Create layout.tsx
  const layoutContent = `export const metadata = {
  title: '${title}',
  description: '${description}',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{
        margin: 0,
        padding: 0,
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif'
      }}>
        {children}
      </body>
    </html>
  )
}`;
  
  fs.writeFileSync(path.join(appDir, 'layout.tsx'), layoutContent);
  
  // Create package.json with TypeScript support
  const packageJson = {
    "name": domain.replace('.', '-'),
    "version": "0.1.0",
    "private": true,
    "scripts": {
      "dev": "next dev",
      "build": "next build",
      "start": "next start",
      "lint": "next lint"
    },
    "dependencies": {
      "next": "14.0.0",
      "react": "^18",
      "react-dom": "^18"
    },
    "devDependencies": {
      "@types/node": "^20",
      "@types/react": "^18",
      "@types/react-dom": "^18",
      "eslint": "^8",
      "eslint-config-next": "14.0.0",
      "typescript": "^5"
    }
  };
  
  fs.writeFileSync(
    path.join(siteDir, 'package.json'),
    JSON.stringify(packageJson, null, 2)
  );
  
  // 🔥 FIXED: Create next.config.js (CommonJS format, not .mjs)
  const nextConfig = `/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = nextConfig`;
  
  // 🔥 KEY FIX: Use .js extension, not .mjs
  fs.writeFileSync(path.join(siteDir, 'next.config.js'), nextConfig);
  
  // Create tsconfig.json for TypeScript support
  const tsConfig = {
    "compilerOptions": {
      "target": "es5",
      "lib": ["dom", "dom.iterable", "es6"],
      "allowJs": true,
      "skipLibCheck": true,
      "strict": true,
      "noEmit": true,
      "esModuleInterop": true,
      "module": "esnext",
      "moduleResolution": "bundler",
      "resolveJsonModule": true,
      "isolatedModules": true,
      "jsx": "preserve",
      "incremental": true,
      "plugins": [
        {
          "name": "next"
        }
      ],
      "paths": {
        "@/*": ["./src/*"]
      }
    },
    "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
    "exclude": ["node_modules"]
  };
  
  fs.writeFileSync(
    path.join(siteDir, 'tsconfig.json'),
    JSON.stringify(tsConfig, null, 2)
  );
  
  // Create .gitignore
  const gitignore = `# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

# dependencies
/node_modules
/.pnp
.pnp.js
.yarn/install-state.gz

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# local env files
.env*.local

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts`;
  
  fs.writeFileSync(path.join(siteDir, '.gitignore'), gitignore);
  
  console.log(`✅ Successfully generated ${domain} with TypeScript support`);
}

async function generateAllWebsites() {
  console.log('🚀 Starting Next.js website generation...');
  
  const buildDir = path.join(__dirname, '..', 'build');
  if (fs.existsSync(buildDir)) {
    fs.rmSync(buildDir, { recursive: true });
  }
  ensureDirectoryExists(buildDir);
  
  const websites = [];
  const csvPath = path.join(__dirname, '..', 'data', 'websites.csv');
  
  if (!fs.existsSync(csvPath)) {
    console.error('❌ CSV file not found at:', csvPath);
    console.log('📁 Current directory:', __dirname);
    console.log('🔍 Looking for CSV at:', csvPath);
    return;
  }
  
  console.log('✅ CSV file found at:', csvPath);
  
  return new Promise((resolve, reject) => {
    fs.createReadStream(csvPath)
      .pipe(csv())
      .on('data', (data) => {
        websites.push(data);
      })
      .on('end', async () => {
        console.log(`📊 Found ${websites.length} websites to generate`);
        
        if (websites.length === 0) {
          console.log('⚠️  No websites found in CSV. Check your CSV format.');
          return;
        }
        
        for (const website of websites) {
          await generateSingleWebsite(website);
        }
        
        console.log('\n🎉 Website generation completed!');
        console.log('📁 Generated websites with TypeScript + src folder structure:');
        websites.forEach(site => {
          console.log(`   - build/${site.domain}/src/app/`);
        });
        console.log('\n🚀 To run individual websites:');
        console.log(`   cd build/${websites[0].domain}`);
        console.log('   npm install');
        console.log('   npm run dev');
        
        resolve();
      })
      .on('error', (error) => {
        console.error('❌ Error reading CSV:', error);
        reject(error);
      });
  });
}

if (require.main === module) {
  generateAllWebsites().catch(console.error);
}

module.exports = { generateAllWebsites };
