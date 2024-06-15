// ViteReact.js
import { execSync } from 'child_process';
import fs from 'fs';

export default function setupReactVite() {
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

  fs.writeFileSync('src/index.css', indexCssContent);

  console.log('Tailwind CSS setup completed!');
}
