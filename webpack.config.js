const path = require("path");

module.exports = {
  // bundling mode
  mode: "production",

  // entry files
  entry: "./src/apps/index.ts",

  // output bundles (location)
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js",
  },

  // file resolutions
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },

  // loaders
  module: {
    rules: [
      {
        test: /\.tsx?/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
    ],
  },
};
