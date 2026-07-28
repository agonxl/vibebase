#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const args = process.argv.slice(2);
let projectName = args[0];

function generateFiles(name) {
  const readmeContent = `# Welcome to Vibe Coding! 🚀

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

  const targetDir = process.cwd();
  
  fs.writeFileSync(path.join(targetDir, 'README.md'), readmeContent);
  fs.writeFileSync(path.join(targetDir, `${name}.md`), heartContent);
  
  console.log(\`\\n✅ Successfully created:\`);
  console.log(\`  - README.md\`);
  console.log(\`  - \${name}.md\\n\`);
  console.log(\`🔒 Security reminder: Never commit API keys or passwords. Use the 'audit "\${name}"' command to check for vulnerabilities.\\n\`);
  console.log(\`Ready for vibe coding! 🚀\`);
}

function askConfirmation(name) {
  rl.question(\`\\n⚠️  Vibe Coding files (README.md and \${name}.md) will be created in the current directory for the '\${name}' project.\\nDo you approve? (Y/n): \`, (answer) => {
    if (answer.toLowerCase() === 'y' || answer.trim() === '') {
      generateFiles(name);
    } else {
      console.log('❌ Operation cancelled.');
    }
    rl.close();
  });
}

if (!projectName) {
  rl.question('What is the name of your project? ', (answer) => {
    if (!answer.trim()) {
      console.log('Project name cannot be empty.');
      rl.close();
      return;
    }
    askConfirmation(answer.trim());
  });
} else {
  askConfirmation(projectName);
}
