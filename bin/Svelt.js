// SvelteKit.js

import { execSync } from 'child_process';
import fs from 'fs';

export default function SvelteKit() {
    console.log('Setting up Tailwind CSS for SvelteKit...');

    // Install dependencies
    execSync('npm install -D tailwindcss@latest postcss@latest autoprefixer@latest', { stdio: 'inherit' });

    // Initialize Tailwind CSS
    execSync('npx tailwindcss init', { stdio: 'inherit' });

    // Check if svelte.config.js or svelte.config.ts exists
    const svelteConfigPathJS = 'svelte.config.js';
    const svelteConfigPathTS = 'svelte.config.ts';
    const svelteConfigPath = fs.existsSync(svelteConfigPathJS) ? svelteConfigPathJS : fs.existsSync(svelteConfigPathTS) ? svelteConfigPathTS : null;

    if (!svelteConfigPath) {
        console.error('Unable to find svelte.config.js or svelte.config.ts');
        return;
    }

    // Modify svelte.config.js or svelte.config.ts
    const svelteConfig = fs.readFileSync(svelteConfigPath, 'utf8');
    const lines = svelteConfig.split('\n');
    let importVitePreprocess = "import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';";
    let preprocessConfig = `  preprocess: vitePreprocess(),`;

    // Insert the import statement at the top
    if (!svelteConfig.includes(importVitePreprocess)) {
        lines.splice(1, 0, importVitePreprocess);
    }

    // Insert the preprocess configuration
    const kitIndex = lines.findIndex(line => line.includes('kit:'));
    if (kitIndex !== -1) {
        const closingBracketIndex = lines.findIndex((line, index) => index > kitIndex && line.includes('}'));
        lines.splice(closingBracketIndex + 1, 0, preprocessConfig);
    } else {
        console.error('Unable to find the kit configuration in svelte.config.js or svelte.config.ts');
        return;
    }

    fs.writeFileSync(svelteConfigPath, lines.join('\n'));

    // Update tailwind.config.js
    const tailwindConfigContent = `/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {},
  },
  plugins: [],
};`;

    fs.writeFileSync('tailwind.config.js', tailwindConfigContent);

    // Create src/app.css and prepend Tailwind CSS directives
    const cssFolderPath = 'src';
    if (!fs.existsSync(cssFolderPath)) {
        fs.mkdirSync(cssFolderPath, { recursive: true });
    }

    const appCssPath = `${cssFolderPath}/app.css`;
    const appCssContent = `@tailwind base;
@tailwind components;
@tailwind utilities;`;
    fs.writeFileSync(appCssPath, appCssContent);

    // Update +layout.svelte to import app.css
    const layoutSveltePath = 'src/routes/+layout.svelte';
    const layoutSvelteContent = `<script>
  import "../app.css";
  import Header from './Header.svelte';
</script>

<div class="app">
  <Header />

  <main>
    <slot />
  </main>

  <footer>
    <p>visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to learn SvelteKit</p>
  </footer>
</div>

<style>
  .app {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  main {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 1rem;
    width: 100%;
    max-width: 64rem;
    margin: 0 auto;
    box-sizing: border-box;
  }

  footer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 12px;
  }

  footer a {
    font-weight: bold;
  }

  @media (min-width: 480px) {
    footer {
      padding: 12px 0;
    }
  }
</style>`;

    fs.writeFileSync(layoutSveltePath, layoutSvelteContent);

    console.log('Tailwind CSS setup completed for SvelteKit!');
}
