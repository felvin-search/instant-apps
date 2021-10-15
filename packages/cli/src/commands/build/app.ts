import webpack from "webpack";
import webpackConfig from "../../lib/webpackConfig";

export default async function main() {
  try {
    webpack(webpackConfig, (err, stats) => {
      // [Stats Object](#stats-object)
      if (err || stats?.hasErrors()) {
        // [Handle errors here](#error-handling)
        console.log("got some errors");
        console.log(err);
        console.log(stats?.toString());
      } else {
        console.log("App built successfully!");
      }
    });
  } catch (err) {
    console.error("Unable to run webpack config");
    throw err;
  }
}

main().catch((error) => {
  console.error(error.stack);
  process.exit(1);
});
