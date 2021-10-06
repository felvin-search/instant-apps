import { Command } from "commander";

export function registerCommand(program: Command) {
  program
    .command("create-app")
    .description("Create instant app boilerplate")
    .action(() => {
      import("./create-app/createApp").then((m) => m.main);
    });
}
