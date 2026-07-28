[![Vibe: High](https://img.shields.io/badge/Vibe-Coding-purple.svg)](#)

# 🌊 Vibe Coding Instructions

This project uses the Vibe Coding methodology. As an AI Agent, you MUST follow these commands when asked by the user:

## 🛠️ Core Commands

### 1. `close "learnvibecode"` Command
When the user types this:
- **First**, write a summary of what was accomplished and what needs to be done next into `.vibe/handoff.md`.
- Safely save the current system state.
- Commit and push the changes with **admin approval**.

### 2. `load "learnvibecode"` Command
When the user types this to start a new session:
- **Immediately** read `.vibe/handoff.md` to understand exactly where the previous chat session left off and pick up the context seamlessly.
- Read `.vibe/learnvibecode.md` to understand the current vibe and goals.
- **IMPORTANT**: You MUST explicitly display this message to the user: *"🔒 Security reminder: Never commit API keys or passwords. Use the `audit` command to check for vulnerabilities."*

### 3. `audit "learnvibecode"` Command
When the user types this:
- Scan the codebase for hardcoded API keys, passwords, and sensitive info.
- Move any sensitive data found into a `.env` file.
- Ensure `.env` is in `.gitignore`.
- Suggest security improvements.

### 4. `compress` Command
When the user types this:
- Read `.vibe/learnvibecode.md`.
- Move all completed `[x]` goals to `.vibe/archive.md`.
- Keep the main `.vibe/learnvibecode.md` file clean, organized, and fast.

### 5. `review` Command
When the user types this:
- Read `.vibe/architecture.md` to understand the project's coding standards.
- Act as a Senior Developer and mercilessly review recent code changes against those architectural rules.
