# Welcome to Vibe Coding! 🚀

This project is specially designed for developers who are new to the vibe coding methodology. 

## 🛠️ Core Concepts and Commands

### 1. `close "learnvibecode"` Command
When you finish your work or want to take a break, you can type this command in the chat. Its functions are:
- Safely saves your current system state.
- Commits and pushes the changes with **admin approval**.
- Prepares the context so you can easily resume later.

### 2. `load "learnvibecode"` Command
When you start a new chat session to continue working on this project, type this command. Its functions are:
- Seamlessly loads where you left off in the previous chat session.
- Pulls the latest project contents and context into the new chat.
- Reads your "Heart of the Project" file to understand the vibe and current goals.
- **IMPORTANT**: As soon as this command is executed, the AI agent MUST explicitly display this message to the user: *"🔒 Security reminder: Never commit API keys or passwords. Use the `audit` command to check for vulnerabilities."*

### 3. `audit "learnvibecode"` Command
When you type this command, the AI agent will perform a security check on your project. Its functions are:
- Scans your codebase for hardcoded API keys, passwords, and sensitive information.
- Warns you if any sensitive data is found and securely moves them to a `.env` file.
- Ensures your `.env` file is added to `.gitignore` to prevent accidental leaks.
- Performs a basic security audit of your code and suggests improvements.

### 4. The Heart of the Project: `learnvibecode.md`
When you join the project, this file is created for you.
- This file is considered the "heart" of the developer.
- You will keep your daily logs, processes, ideas, and the project's "vibe" in this file.
