#!/usr/bin/env node

const { resolve, join } = require("path");
const fs = require("fs-extra");

const projecthome = resolve(__dirname, "..");
const TEMPLATE_APP_PATH = join(projecthome, "utils/myApp.jsx");
const FINAL_APP_PATH = join(projecthome, "src/apps/myApp.jsx");

async function main() {
  console.log("Create new app...");
  await fs.copy(TEMPLATE_APP_PATH, FINAL_APP_PATH);
  console.log(`New app created! Path: ${FINAL_APP_PATH}`);
  console.log(
    "\n[NEXT STEP]: Open `src/apps/index.ts` file and update the `availableApps` array after importing the new app which just got created."
  );
}

main().catch((error) => {
  console.error(error.stack);
  process.exit(1);
});
