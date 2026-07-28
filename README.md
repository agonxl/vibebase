<div align="center">
  <h1>🌊 learnvibecode</h1>
  <p><strong>The ultimate foundation for Vibe Coding with AI Agents.</strong></p>
  <p>Vibecoder friendly. 100% Local. Zero configuration.</p>
</div>

---

## 🚀 Quick Start (So simple, a baby could do it)

You don't even need to install anything. Just open your terminal, go to your project folder, and run:

```bash
npx learnvibecode
```

The interactive wizard will ask you 2 simple questions and instantly set up your project for AI agents (like Claude Code, Cursor, ChatGPT).

### What does it do?
It builds a complete **Agentic Workflow Architecture** that stays 100% on your local machine:
1. **\`VIBE.md\` (AI Instructions):** Trains any AI agent on how to interact with your project using strict commands (\`close\`, \`load\`, \`audit\`, \`review\`, \`compress\`).
2. **\`.vibe/\` Folder (The Foundation):**
   - **\`[project-name].md\`**: The Heart of your project. Tracks goals, ideas, and your daily vibe.
   - **\`handoff.md\`**: For agent shift-handovers. AI saves its context here so a new chat session can pick up exactly where it left off.
   - **\`architecture.md\`**: Define your tech stack and coding conventions. The AI will enforce these during code reviews.
3. **AI Rules:** Generates \`.cursorrules\` or \`clauderules.md\` automatically so your AI never forgets the project's vibe.

---

## 🤖 The AI Commands (Prompt Engineering)

Once initialized, you can type these magic words into your AI Chat to trigger powerful, pre-programmed behaviors:

- **\`load\`**: The AI instantly reads \`.vibe/handoff.md\` and picks up exactly where the last chat session left off.
- **\`close\`**: The AI writes a summary to \`.vibe/handoff.md\` for the next session, saves your state, and pushes to git.
- **\`review\`**: The AI acts as a Senior Developer, reading your \`architecture.md\`, and ruthlessly reviews your recent code changes.
- **\`compress\`**: The AI reads your Heart file, archives completed goals, and keeps your project context lightweight and fast.
- **\`audit\`**: The AI scans your codebase for leaked API keys, moves them to \`.env\`, and checks \`.gitignore\`.

---

## 🛠️ CLI Superpowers (Terminal Commands)

Not using an integrated AI editor? No problem. Use our built-in terminal commands:

### 📦 Pack Context for Web AI
```bash
npx learnvibecode pack
```
*Bundles your entire \`.vibe/\` folder and instructions into one file (\`vibe-context.txt\`). Just copy and paste it directly into ChatGPT or Claude Web!*

### 🛡️ Vibe & Security Check
```bash
npx learnvibecode check
```
*Scans your project for forgotten API keys and prints a beautiful, colorful progress report of your goals directly to the terminal.*

---

**Keep it simple. Keep the vibe high. ✨**
