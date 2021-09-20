const { Command } = require("commander");
const build = require("./lib/build");

const program = new Command();
program.version("0.0.1");

program
  .command("build")
  .description("Build an instant app")
  .action(() => {
    console.log("Build command called");
    build();
  });

program.parse(process.argv);
