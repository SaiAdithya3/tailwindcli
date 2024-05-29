import { execSync } from 'child_process';
import fs from 'fs';

export default function Next() {
  console.log('Setting up Tailwind CSS for Next.js...');

  // Install dependencies
  execSync('npm install -D tailwindcss@latest postcss@latest autoprefixer@latest', { stdio: 'inherit' });

  // Initialize Tailwind CSS
  execSync('npx tailwindcss init -p', { stdio: 'inherit' });

  // Create tailwind.config.js content
  const tailwindConfigContent = `/** @type {import('tailwindcss').Config} */
    module.exports = {
        content: [
          "./app/**/*.{js,ts,jsx,tsx,mdx}",
          "./pages/**/*.{js,ts,jsx,tsx,mdx}",
          "./components/**/*.{js,ts,jsx,tsx,mdx}",
          
          // Or if using 'src' directory:
          "./src/**/*.{js,ts,jsx,tsx,mdx}",
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

  fs.writeFileSync('styles/globals.css', indexCssContent);

  console.log('Tailwind CSS setup completed!');
}