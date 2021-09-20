const webpack = require("webpack");
const webpackConfig = require("./webpackConfig");

function build() {
  // Read package.json and set correct entry points for browser and server bundles

  webpack(webpackConfig, (err, stats) => {
    // [Stats Object](#stats-object)
    if (err || stats.hasErrors()) {
      // [Handle errors here](#error-handling)
      console.log("got some errors");
      console.log(err);
      console.log(stats.toString());
    } else {
      console.log("Done building!");
    }
  });
}

module.exports = build;
