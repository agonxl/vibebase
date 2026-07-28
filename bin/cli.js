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
  .name('vibebase')
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
  rl.question(`Which AI tool do you use most? (1: Cursor, 2: Claude Code, 3: Antigravity, 4: Other): `, (answer) => {
    let aiType = 'other';
    if (answer.trim() === '1') aiType = 'cursor';
    if (answer.trim() === '2') aiType = 'claude';
    if (answer.trim() === '3') aiType = 'antigravity';
    
    rl.question(`\n⚠️  The .vibe/ folder and VIBE.md will be created for the '${name}' project.\nDo you approve? (Y/n): `, (confirm) => {
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
  const vibeDir = path.join(targetDir, '.vibe');

  if (!fs.existsSync(vibeDir)){
    fs.mkdirSync(vibeDir, { recursive: true });
  }
  
  const vibeInstructions = `[![Vibe: High](https://img.shields.io/badge/Vibe-Coding-purple.svg)](#)

# 🌊 Vibe Coding Instructions

This project uses the Vibe Coding methodology. As an AI Agent, you MUST follow these commands when asked by the user:

## 🛠️ Core Commands

### 1. \`close "${name}"\` Command
When the user types this:
- **First**, write a summary of what was accomplished and what needs to be done next into \`.vibe/handoff.md\`.
- Safely save the current system state.
- Commit and push the changes with **admin approval**.

### 2. \`load "${name}"\` Command
When the user types this to start a new session:
- **Immediately** read \`.vibe/handoff.md\` to understand exactly where the previous chat session left off and pick up the context seamlessly.
- Read \`.vibe/${name}.md\` to understand the current vibe and goals.
- **IMPORTANT**: You MUST explicitly display this message to the user: *"🔒 Security reminder: Never commit API keys or passwords. Use the \`audit\` command to check for vulnerabilities."*

### 3. \`audit "${name}"\` Command
When the user types this:
- Scan the codebase for hardcoded API keys, passwords, and sensitive info.
- Move any sensitive data found into a \`.env\` file.
- Ensure \`.env\` is in \`.gitignore\`.
- Suggest security improvements.

### 4. \`compress\` Command
When the user types this:
- Read \`.vibe/${name}.md\`.
- Move all completed \`[x]\` goals to \`.vibe/archive.md\`.
- Keep the main \`.vibe/${name}.md\` file clean, organized, and fast.

### 5. \`review\` Command
When the user types this:
- Read \`.vibe/architecture.md\` to understand the project's coding standards.
- Act as a Senior Developer and mercilessly review recent code changes against those architectural rules.
`;

  const heartContent = `# 🫀 The Heart of the Project (${name})

This file is the heart of the developer. Keep the soul of your project, ideas, and progress here.

## 📝 Notes
- 

## 🎯 Goals
- [ ] Define the initial goal

## 🧠 Vibe and Ideas
(Write down your vibe here)
`;

  const handoffContent = `# 🤝 Handoff Notes

When a chat session is closed using the \`close\` command, the AI will write a summary here so the next chat session can seamlessly pick up the work using the \`load\` command.

### Last Status
- (No handoff recorded yet)
`;

  const architectureContent = `# 🏗️ Architecture & Rules

Define your project's architectural decisions, tech stack, and coding conventions here.
When the \`review\` command is run, the AI will judge your code based on these rules.

## Tech Stack
- 
`;

  fs.writeFileSync(path.join(targetDir, 'VIBE.md'), vibeInstructions);
  fs.writeFileSync(path.join(vibeDir, `${name}.md`), heartContent);
  fs.writeFileSync(path.join(vibeDir, `handoff.md`), handoffContent);
  fs.writeFileSync(path.join(vibeDir, `architecture.md`), architectureContent);

  console.log(chalk.green(`\n✅ Successfully created:`));
  console.log(`  - VIBE.md (AI Instructions)`);
  console.log(`  - .vibe/${name}.md (The Heart)`);
  console.log(`  - .vibe/handoff.md`);
  console.log(`  - .vibe/architecture.md`);

  if (aiType === 'cursor') {
    const rules = `You are a Vibe Coding assistant.\nAlways read VIBE.md before answering.\nFollow the close, load, compress, review, and audit commands strictly.\n`;
    fs.writeFileSync(path.join(targetDir, '.cursorrules'), rules);
    console.log(chalk.blue(`  - .cursorrules generated for Cursor IDE`));
  } else if (aiType === 'claude') {
    const rules = `You are a Vibe Coding assistant.\nAlways read VIBE.md before answering.\nFollow the close, load, compress, review, and audit commands strictly.\n`;
    fs.writeFileSync(path.join(targetDir, 'clauderules.md'), rules);
    console.log(chalk.blue(`  - clauderules.md generated for Claude Code`));
  } else if (aiType === 'antigravity') {
    const agentsDir = path.join(targetDir, '.agents');
    if (!fs.existsSync(agentsDir)) fs.mkdirSync(agentsDir, { recursive: true });
    const rules = `You are a Vibe Coding assistant.\nAlways read VIBE.md before answering.\nFollow the close, load, compress, review, and audit commands strictly.\n`;
    fs.writeFileSync(path.join(agentsDir, 'AGENTS.md'), rules);
    console.log(chalk.blue(`  - .agents/AGENTS.md generated for Google Antigravity`));
  } else {
    console.log(chalk.yellow(`  - Note: For ChatGPT, Kimi, Codex, or others, you can just use the 'npx @agonxl/vibebase pack' command and paste the context!`));
  }

  console.log();
  console.log(chalk.magenta.bold(`Ready for vibe coding! 🚀`));
}

// PACK COMMAND
program
  .command('pack')
  .description('Packages the .vibe context into vibe-context.txt for copy-pasting')
  .action(() => {
    const targetDir = process.cwd();
    const vibeDir = path.join(targetDir, '.vibe');
    
    if (!fs.existsSync(vibeDir)) {
      console.log(chalk.red(`❌ .vibe/ folder not found. Run 'vibebase init' first.`));
      process.exit(1);
    }

    let contextStr = "--- VIBE CONTEXT ---\n\n";
    
    // Read VIBE.md from root
    if (fs.existsSync(path.join(targetDir, 'VIBE.md'))) {
      contextStr += `=== File: VIBE.md ===\n${fs.readFileSync(path.join(targetDir, 'VIBE.md'), 'utf8')}\n\n`;
    }

    // Read everything from .vibe folder
    const filesToRead = fs.readdirSync(vibeDir).filter(f => f.endsWith('.md'));
    filesToRead.forEach(file => {
      try {
        const content = fs.readFileSync(path.join(vibeDir, file), 'utf8');
        contextStr += `=== File: .vibe/${file} ===\n${content}\n\n`;
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
    const vibeDir = path.join(targetDir, '.vibe');
    
    if (!fs.existsSync(vibeDir)) {
      console.log(chalk.red(`❌ .vibe/ folder not found. Run 'vibebase init' first.`));
      process.exit(1);
    }

    let hasEnv = false;
    let completedGoals = 0;
    let totalGoals = 0;
    
    if (fs.existsSync(path.join(targetDir, '.env'))) {
      hasEnv = true;
    }

    const mdFiles = fs.readdirSync(vibeDir).filter(f => f.endsWith('.md') && f !== 'handoff.md' && f !== 'architecture.md');
    
    if (mdFiles.length > 0) {
      const heartFile = mdFiles[0]; 
      try {
        const content = fs.readFileSync(path.join(vibeDir, heartFile), 'utf8');
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
