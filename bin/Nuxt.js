// ViteReact.js

import { execSync } from 'child_process';
import fs from 'fs';

export default function Nuxt() {
  console.log('Setting up Tailwind CSS for Nuxt.js...');

  // Install dependencies
  execSync('npm install -D tailwindcss@latest postcss@latest autoprefixer@latest', { stdio: 'inherit' });

  // Initialize Tailwind CSS
  execSync('npx tailwindcss init -p', { stdio: 'inherit' });

  // Check if nuxt.config.js or nuxt.config.ts exists
  const nuxtConfigPathJS = 'nuxt.config.js';
  const nuxtConfigPathTS = 'nuxt.config.ts';
  const nuxtConfigPath = fs.existsSync(nuxtConfigPathJS) ? nuxtConfigPathJS : fs.existsSync(nuxtConfigPathTS) ? nuxtConfigPathTS : null;

  if (!nuxtConfigPath) {
    console.error('Unable to find nuxt.config.js or nuxt.config.ts');
    return;
  }

  // Modify nuxt.config.js or nuxt.config.ts
  const nuxtConfig = fs.readFileSync(nuxtConfigPath, 'utf8');
  const lines = nuxtConfig.split('\n');
  let tailwindCSSConfig = `
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },`;

  // Find the index of the devtools line
  const devtoolsIndex = lines.findIndex(line => line.includes('devtools'));

  // Insert the Tailwind CSS configuration after the devtools line
  if (devtoolsIndex !== -1) {
    lines[devtoolsIndex] += ',';
    lines.splice(devtoolsIndex + 1, 0, tailwindCSSConfig);
  } else {
    console.error('Unable to find the devtools line in nuxt.config.js or nuxt.config.ts');
    return;
  }

  fs.writeFileSync(nuxtConfigPath, lines.join('\n'));
  const tailwindConfigContent = `/** @type {import('tailwindcss').Config} */
    module.exports = {
      content: [
        "./components/**/*.{js,vue,ts}",
        "./layouts/**/*.vue",
        "./pages/**/*.vue",
        "./plugins/**/*.{js,ts}",
        "./app.vue",
        "./error.vue",
      ],
      theme: {
        extend: {},
      },
      plugins: [],
    }`;
  fs.writeFileSync('tailwind.config.js', tailwindConfigContent);
  const mainCssContent = `@tailwind base;
    @tailwind components;
    @tailwind utilities;`;

  // Create assets/css folder if it doesn't exist
  const cssFolderPath = 'assets/css';
  if (!fs.existsSync(cssFolderPath)) {
    fs.mkdirSync(cssFolderPath, { recursive: true });
  }

  // Write main.css file
  const mainCssPath = `${cssFolderPath}/main.css`;
  if (!fs.existsSync(mainCssPath)) {
    fs.writeFileSync(mainCssPath, mainCssContent);
  } else {
    // Prepend Tailwind CSS directives if main.css already exists
    const existingMainCssContent = fs.readFileSync(mainCssPath, 'utf8');
    fs.writeFileSync(mainCssPath, `${mainCssContent}\n${existingMainCssContent}`);
  }

  console.log('Tailwind CSS setup completed for Nuxt.js!');
}
