#!/usr/bin/env node

import inquirer from 'inquirer';
import { execSync } from 'child_process';
import fs from 'fs';

const frameworks = [
  'React with Vite',
  // Add other options here if needed
];

inquirer.prompt([
  {
    type: 'list',
    name: 'framework',
    message: 'Select the framework you are using:',
    choices: frameworks
  }
]).then(answers => {
  if (answers.framework === 'React with Vite') {
    setupReactVite();
  } else {
    console.log('Framework not supported yet.');
  }
});

function setupReactVite() {
  console.log('Setting up Tailwind CSS for React with Vite...');

  // Install dependencies
  execSync('npm install -D tailwindcss@latest postcss@latest autoprefixer@latest', { stdio: 'inherit' });

  // Initialize Tailwind CSS
  execSync('npx tailwindcss init -p', { stdio: 'inherit' });

  // Create tailwind.config.js content
  const tailwindConfigContent = `/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}`;

  fs.writeFileSync('tailwind.config.js', tailwindConfigContent);

  // Add Tailwind directives to index.css
  const indexCssContent = `@tailwind base;
@tailwind components;
@tailwind utilities;`;
    
  fs.writeFileSync('index.css', indexCssContent);

  console.log('Tailwind CSS setup completed!');
}
