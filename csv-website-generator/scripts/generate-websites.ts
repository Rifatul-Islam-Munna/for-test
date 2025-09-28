
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');


const { heroTemplate } = require('../templates/HeroTemplate.tsx');
const { contactTemplate } = require('../templates/ContactTemplate.tsx');


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
  

  fs.writeFileSync(
    path.join(componentsDir, 'Hero.tsx'),
    processedHero
  );
  

  fs.writeFileSync(
    path.join(componentsDir, 'Contact.tsx'),
    processedContact
  );
  

  const pageContent = `
'use client'
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
}
`;
  
  fs.writeFileSync(path.join(appDir, 'page.tsx'), pageContent);
  
 
  const layoutContent = `
export const metadata = {
  title: '${title}',
  description: '${description}',
}

export default function RootLayout({ children }) {
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
}
`;
  
  fs.writeFileSync(path.join(appDir, 'layout.tsx'), layoutContent);
  
 
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
      "eslint": "^8",
      "eslint-config-next": "14.0.0"
    }
  };
  
  fs.writeFileSync(
    path.join(siteDir, 'package.json'),
    JSON.stringify(packageJson, null, 2)
  );
  

  const nextConfig = `
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
}

module.exports = nextConfig
`;
  
  fs.writeFileSync(path.join(siteDir, 'next.config.ts'), nextConfig);
  


  

  
  console.log(` Successfully generated ${domain} with src folder structure`);
}


async function generateAllWebsites() {
  console.log(' Starting Next.js website generation...');
  

  const buildDir = path.join(__dirname, '..', 'build');
  if (fs.existsSync(buildDir)) {
    fs.rmSync(buildDir, { recursive: true });
  }
  ensureDirectoryExists(buildDir);
  
  const websites = [];
  const csvPath = path.join(__dirname, '..', 'data', 'websites.csv');
  

  if (!fs.existsSync(csvPath)) {
    console.error(' CSV file not found at:', csvPath);
    console.log('Current directory:', __dirname);
    console.log(' Looking for CSV at:', csvPath);
    return;
  }
  
  console.log(' CSV file found at:', csvPath);
  

  return new Promise((resolve, reject) => {
    fs.createReadStream(csvPath)
      .pipe(csv())
      .on('data', (data) => {
        websites.push(data);
      })
      .on('end', async () => {
        console.log(` Found ${websites.length} websites to generate`);
        
        if (websites.length === 0) {
          console.log(' No websites found in CSV. Check your CSV format.');
          return;
        }
        
  
        for (const website of websites) {
          await generateSingleWebsite(website);
        }
        
   
        console.log(' Website generation completed!');
        console.log(' Generated websites with src folder structure:');
        websites.forEach(site => {
          console.log(`   - build/${site.domain}/src/app/`);
        });
        console.log(' To run individual websites:');
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

// Export for use in package.json scripts
if (require.main === module) {
  generateAllWebsites().catch(console.error);
}

module.exports = { generateAllWebsites };
