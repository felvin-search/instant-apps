const { spawn } = require("child_process");
// Script to start the development server of sandbox
// the problem with concurrently approach is that nodemon will fail with webpack build hasn't been configured, resulting in a bad new user experience

const webpackCmd = spawn("webpack", [
  "--config",
  "webpack.server.js",
  "--mode=development",
  "-w",
]);

webpackCmd.stdout.on("data", (data) => {
  process.stdout.write(`${data}`);

  if (
    Buffer.from(data)
      .toString()
      .match(/webpack [0-9.]+ compiled/)
  ) {
    // Setup nodemon/chokidar perfectly so that server restarts without address in use errors.
    // // Wait until webpack creates the dist/ files unless nodemon is going to crash
    // // A delay is good so that the existing express process exists and empties the port
    // const expressCmd = spawn("nodemon", [
    //   "--delay",
    //   "2.5",
    //   "./dist/index.cjs.js",
    // ]);

    const expressCmd = spawn("node", ["./dist/index.cjs.js"]);
    expressCmd.stdout.on("data", (data) => {
      process.stdout.write(`${data}`);
    });

    expressCmd.stderr.on("data", (data) => {
      console.error(`express stderr:\n${data}`);
      expressCmd.kill();
      process.exit(1);
    });

    process.on("SIGINT", () => {
      webpackCmd.kill();
      expressCmd.kill();
    });
  }
});

webpackCmd.stderr.on("data", (data) => {
  console.error(`webpack stderr:\n${data}`);
});
