#!/usr/bin/env node

import inquirer from 'inquirer';
import { execSync } from 'child_process';
import fs from 'fs';
import chalk from 'chalk';
import CRA from './bin/CRA.js';
import setupReactVite from './bin/ViteReact.js';
import Next from './bin/Next.js';
import VueVite from './bin/VueVite.js';
import Nuxt from './bin/Nuxt.js';
import Angular from './bin/Angular.js';
import SvelteKit from './bin/Svelt.js';


import stripAnsi from 'strip-ansi';

const frameworks = [

    chalk.magenta('React with Vite'),
    chalk.blueBright('React with Create React App'),
    chalk.black('Next.js'),
    chalk.green('Vue with Vite'),
    chalk.cyan('Nuxt.js'),
    chalk.red('Angular'),
    chalk.yellowBright('Svelte with SvelteKit'),
];

inquirer.prompt([
    {
        type: 'list',
        name: 'framework',
        message: 'Select the framework you are using:',
        choices: frameworks
    }
]).then(answers => {
    const framework = stripAnsi(answers.framework);
    if (framework=== 'React with Vite') {
        setupReactVite();
    } else if (framework === 'React with Create React App') {
        CRA();
    }
    else if(framework === 'Next.js'){
        Next();
    }
    else if(framework === 'Vue with Vite'){
        VueVite();
    }
    else if(framework === 'Nuxt.js'){
        Nuxt();
    }
    else if(framework === 'Angular'){
        Angular();
    }
    else if(framework === 'Svelte with SvelteKit'){
        SvelteKit();
    }
    else {
        console.log('Invalid framework selected.');
    }
});

