#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { program } = require('commander');
const chalk = require('chalk');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

program
  .name('learnvibecode')
  .description('Vibe coding assistant tool')
  .version('1.0.0');

// INIT COMMAND
program
  .command('init [projectName]')
  .description('Initialize a vibe coding project')
  .action((projectName) => {
    if (!projectName) {
      rl.question('What is the name of your project? ', (answer) => {
        if (!answer.trim()) {
          console.log(chalk.red('Project name cannot be empty.'));
          rl.close();
          return;
        }
        askAIAndGenerate(answer.trim());
      });
    } else {
      askAIAndGenerate(projectName);
    }
  });

function askAIAndGenerate(name) {
  rl.question(`Which AI tool do you use most? (1: Cursor, 2: Claude Code, 3: Other): `, (answer) => {
    let aiType = 'other';
    if (answer.trim() === '1') aiType = 'cursor';
    if (answer.trim() === '2') aiType = 'claude';
    
    rl.question(`\n⚠️  Vibe Coding files will be created for the '${name}' project.\nDo you approve? (Y/n): `, (confirm) => {
      if (confirm.toLowerCase() === 'y' || confirm.trim() === '') {
        generateFiles(name, aiType);
      } else {
        console.log(chalk.red('❌ Operation cancelled.'));
      }
      rl.close();
    });
  });
}

function generateFiles(name, aiType) {
  const targetDir = process.cwd();
  
  const readmeContent = `[![Vibe: High](https://img.shields.io/badge/Vibe-Coding-purple.svg)](#)

# Welcome to Vibe Coding! 🚀

This project is specially designed for developers who are new to the vibe coding methodology. 

## 🛠️ Core Concepts and Commands

### 1. \`close "${name}"\` Command
When you finish your work or want to take a break, you can type this command in the chat. Its functions are:
- Safely saves your current system state.
- Commits and pushes the changes with **admin approval**.
- Prepares the context so you can easily resume later.

### 2. \`load "${name}"\` Command
When you start a new chat session to continue working on this project, type this command. Its functions are:
- Seamlessly loads where you left off in the previous chat session.
- Pulls the latest project contents and context into the new chat.
- Reads your "Heart of the Project" file to understand the vibe and current goals.
- **IMPORTANT**: As soon as this command is executed, the AI agent MUST explicitly display this message to the user: *"🔒 Security reminder: Never commit API keys or passwords. Use the \`audit\` command to check for vulnerabilities."*

### 3. \`audit "${name}"\` Command
When you type this command, the AI agent will perform a security check on your project. Its functions are:
- Scans your codebase for hardcoded API keys, passwords, and sensitive information.
- Warns you if any sensitive data is found and securely moves them to a \`.env\` file.
- Ensures your \`.env\` file is added to \`.gitignore\` to prevent accidental leaks.
- Performs a basic security audit of your code and suggests improvements.

### 4. The Heart of the Project: \`${name}.md\`
When you join the project, this file is created for you.
- This file is considered the "heart" of the developer.
- You will keep your daily logs, processes, ideas, and the project's "vibe" in this file.
`;

  const heartContent = `# 🫀 The Heart of the Project (${name})

This file is the heart of the developer. You will keep the soul of your project, the decisions made, your interactions with AI, and your progress status here.

## 📝 Notes
- 

## 🎯 Goals
- [ ] Define the initial goal

## 🧠 Vibe and Ideas
(Write down your ideas and the "vibe" of the project here)

---
*💡 Reminder: When you finish your work, you can type \`close "${name}"\` in the chat to save the system state and send it for admin approval.*
`;

  fs.writeFileSync(path.join(targetDir, 'README.md'), readmeContent);
  fs.writeFileSync(path.join(targetDir, `${name}.md`), heartContent);

  console.log(chalk.green(`\n✅ Successfully created:`));
  console.log(`  - README.md (with Vibe Badge!)`);
  console.log(`  - ${name}.md`);

  if (aiType === 'cursor') {
    const rules = `You are a Vibe Coding assistant.\nAlways read README.md and ${name}.md before answering.\nFollow the close, load, and audit command instructions strictly.\n`;
    fs.writeFileSync(path.join(targetDir, '.cursorrules'), rules);
    console.log(chalk.blue(`  - .cursorrules generated for Cursor IDE`));
  } else if (aiType === 'claude') {
    const rules = `You are a Vibe Coding assistant.\nAlways read README.md and ${name}.md before answering.\nFollow the close, load, and audit command instructions strictly.\n`;
    fs.writeFileSync(path.join(targetDir, 'clauderules.md'), rules);
    console.log(chalk.blue(`  - clauderules.md generated for Claude Code`));
  }

  console.log();
  console.log(chalk.yellow(`🔒 Security reminder: Never commit API keys or passwords. Use the 'audit "${name}"' command to check for vulnerabilities.\n`));
  console.log(chalk.magenta.bold(`Ready for vibe coding! 🚀`));
}

// PACK COMMAND
program
  .command('pack')
  .description('Packages the context into vibe-context.txt for copy-pasting to LLMs')
  .action(() => {
    const targetDir = process.cwd();
    const filesToRead = fs.readdirSync(targetDir).filter(f => f.endsWith('.md'));
    let contextStr = "--- VIBE CONTEXT ---\n\n";
    
    filesToRead.forEach(file => {
      try {
        const content = fs.readFileSync(path.join(targetDir, file), 'utf8');
        contextStr += `=== File: ${file} ===\n${content}\n\n`;
      } catch (e) {
        console.log(chalk.red(`Could not read ${file}`));
      }
    });

    fs.writeFileSync(path.join(targetDir, 'vibe-context.txt'), contextStr);
    console.log(chalk.green(`✅ Packed context into vibe-context.txt!`));
    console.log(chalk.cyan(`You can now copy the contents of vibe-context.txt and paste it into ChatGPT/Claude web.`));
    process.exit(0);
  });

// CHECK COMMAND
program
  .command('check')
  .description('Performs a Vibe and Security scan')
  .action(() => {
    const targetDir = process.cwd();
    let hasEnv = false;
    let completedGoals = 0;
    let totalGoals = 0;
    
    if (fs.existsSync(path.join(targetDir, '.env'))) {
      hasEnv = true;
    }

    const mdFiles = fs.readdirSync(targetDir).filter(f => f.endsWith('.md') && f !== 'README.md' && f !== 'clauderules.md');
    
    if (mdFiles.length > 0) {
      const heartFile = mdFiles[0]; 
      try {
        const content = fs.readFileSync(path.join(targetDir, heartFile), 'utf8');
        const lines = content.split('\n');
        lines.forEach(line => {
          if (line.includes('- [ ]')) totalGoals++;
          if (line.includes('- [x]') || line.includes('- [X]')) {
            totalGoals++;
            completedGoals++;
          }
        });
      } catch (e) {
        // ignore
      }
    }

    console.log(chalk.bold.magenta(`\n✨ --- VIBE REPORT --- ✨`));
    
    if (hasEnv) {
      console.log(chalk.green(`🔒 Security: Excellent (.env file found)`));
    } else {
      console.log(chalk.yellow(`⚠️ Security Warning: No .env file found. Be careful with API keys!`));
    }

    console.log(chalk.cyan(`🎯 Goals: ${completedGoals}/${totalGoals} completed`));
    
    if (completedGoals === totalGoals && totalGoals > 0) {
      console.log(chalk.green(`🚀 Vibe is EXCELLENT! Keep it up!`));
    } else {
      console.log(chalk.blue(`💡 Vibe is good. Time to tackle those goals!`));
    }
    console.log();
    process.exit(0);
  });

program.parse(process.argv);
