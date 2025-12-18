📘 Developer Notes – AI Knowledge Vault
📅 Guarantee

This file contains:

Errors I faced

Their causes

Fixes

Important concepts I want to remember

1️⃣ Error: “Must use import to load ES Module”
❌ Error Message
Error: Must use import to load ES Module

🔍 Root Cause

Node.js was treating the project as ES Modules

TypeScript was configured for CommonJS

This caused a module system mismatch

🛠️ Fix

Remove "type": "module" from package.json

Ensure tsconfig.json contains:

{
  "module": "CommonJS"
}

🧠 Key Learning

Node.js and TypeScript must agree on the module system

2️⃣ Understanding package.json Scripts
"scripts": {
  "dev": "ts-node-dev --respawn --transpile-only src/server.ts",
  "build": "tsc",
  "start": "node dist/server.js"
}

🟢 dev

Runs TypeScript directly

Auto restarts on file change

Fast development experience

Tools emphasized:

ts-node-dev

--transpile-only skips type checking for speed

🔵 build

Converts TypeScript → JavaScript

Outputs compiled files to /dist

Ensures full type safety

🔴 start

Runs compiled JavaScript

Used in production

Faster and safer

🧠 Key Learning

Development, build, and production must be separate processes

3️⃣ TypeScript Best Practices (So Far)

Always use strict: true

Avoid any

Use explicit types (Application, Request, etc.)

Prefix unused variables with _

Example:

app.get("/health", (_req, res) => {
  res.json({ status: "OK" });
});

4️⃣ Why We Use CommonJS in Backend
Reason:

Express ecosystem is more stable with CommonJS

Easier compatibility with:

PostgreSQL

JWT

Hugging Face SDKs

🧠 Key Learning

ES Modules are modern, but CommonJS is still safer for backend TS projects