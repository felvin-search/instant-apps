import { Command } from "commander";
import { registerCommand } from "./commands";

const main = (argv: string[]) => {
  const program = new Command();
  program.name("felvin-cli").version("0.1.0");

  registerCommand(program);

  program.parse(argv);
};

main(process.argv);
