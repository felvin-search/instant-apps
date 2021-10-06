import { resolve, join } from "path";
import fs from "fs-extra";
import inquirer, { Answers } from "inquirer";
import chalk from "chalk";

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
          chalk.red("Please enter an ID for the app");
        } else if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(value)) {
          return chalk.red(
            "Plugin IDs must be lowercase and contain only letters, digits, and dashes."
          );
        }
        return true;
      },
    },
  ]);

  console.log("Checking if ID is availaible");

  let FINAL_APP_PATH = join(PROJECT_HOME, `apps/${answers.id}`);
  if (await fs.pathExists(FINAL_APP_PATH)) {
    console.log(
      chalk.red("ID already exists, making an app with the id 'default-app'")
    );

    FINAL_APP_PATH = join(PROJECT_HOME, `apps/default-app`);
  }

  await fs.copy(TEMPLATE_APP_PATH, FINAL_APP_PATH);
  console.log(chalk.green(`New app created! Path: ${FINAL_APP_PATH}`));

  // TODO: fill in the values obtained as the input in the templates
}

main().catch((error) => {
  console.error(error.stack);
  process.exit(1);
});
