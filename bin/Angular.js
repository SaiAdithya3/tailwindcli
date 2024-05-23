import { execSync } from 'child_process';
import fs from 'fs';


export default function Angular() {
    console.log('Setting up Tailwind CSS for Angular...');

    // Install dependencies
    execSync('npm install -D tailwindcss@latest postcss@latest autoprefixer@latest', { stdio: 'inherit' });

    // Initialize Tailwind CSS
    execSync('npx tailwindcss init -p', { stdio: 'inherit' });

    // Create tailwind.config.js content
    const tailwindConfigContent = `/** @type {import('tailwindcss').Config} */
    module.exports = {
      content: [
        "./src/**/*.{html,ts}",
      ],
      theme: {
        extend: {},
      },
      plugins: [],
    }`;

    fs.writeFileSync('tailwind.config.js', tailwindConfigContent);

    // Add Tailwind directives to styles.css
    const stylesCssContent = `@tailwind base;   
@tailwind components;
@tailwind utilities;`;

    fs.writeFileSync('src/styles.css', stylesCssContent);

    console.log('Tailwind CSS setup completed!');
}