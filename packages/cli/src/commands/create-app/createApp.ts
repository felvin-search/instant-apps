import { resolve, join } from "path";
import fs from "fs-extra";
import inquirer, { Answers } from "inquirer";
import chalk from "chalk";
import handlebars from "handlebars";
import recursive from "recursive-readdir";
import { exec } from "child_process";

export async function main() {
  const PROJECT_HOME = resolve(__dirname, "../../../../..");
  const TEMPLATE_APP_PATH = join(
    PROJECT_HOME,
    "packages/cli/templates/default-app"
  );

  const answers: Answers = await inquirer.prompt([
    {
      type: "input",
      name: "id",
      message: "Enter an ID for the app [required]",
      validate: (value: any) => {
        if (!value) {
          return chalk.red("Please enter an ID for the app");
        } else if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(value)) {
          return chalk.red(
            "Plugin IDs must be lowercase and contain only letters, digits, and dashes."
          );
        }
        return true;
      },
    },
    {
      type: "input",
      name: "name",
      message: "Enter a name for the app [required]",
      validate: (value: any) => {
        if (!value) {
          return chalk.red("Please enter a name for the app");
        }
        return true;
      },
    },
    {
      type: "input",
      name: "description",
      message: "Enter a description for the app [required]",
      validate: (value: any) => {
        if (!value) {
          return chalk.red("Please enter a description for the app");
        }
        return true;
      },
    },
    {
      type: "input",
      name: "triggerWords",
      message: "Enter comma separated trigger words for the app [required]",
      validate: (value: any) => {
        if (!value) {
          return chalk.red("please enter trigger words for the app");
        }
        return true;
      },
    },
  ]);

  async function generateTemplate(directory) {
    try {
      const files = await recursive(directory);
      for (let file of files) {
        if (file.endsWith(".hbs")) {
          const template = await fs.readFile(file);
          const compiled = handlebars.compile(template.toString());
          const contents = compiled({
            appId: answers.id,
            appName: answers.name,
            appDescription: answers.description,
            triggerWords: answers.triggerWords
              .split(",")
              .map((item) => `"${item.trim()}"`),
          });

          await fs.writeFile(file, contents);
          await fs.rename(file, file.replace(/\.hbs/, ""));
        }
      }
    } catch (error) {
      console.log(chalk.redBright("Error while generating template", error));
    }
  }

  let FINAL_APP_PATH = join(PROJECT_HOME, `apps/${answers.id}`);
  if (await fs.pathExists(FINAL_APP_PATH)) {
    throw new Error("ID already exists, please try again with different id");
  }

  await fs.copy(TEMPLATE_APP_PATH, FINAL_APP_PATH);

  await generateTemplate(FINAL_APP_PATH);

  console.log(chalk.green(`New app created! Path: ${FINAL_APP_PATH}`));

  console.log(chalk.blue("Installing dependencies"));
  exec("yarn install");
}

main().catch((error) => {
  console.error(error.stack);
  process.exit(1);
});
