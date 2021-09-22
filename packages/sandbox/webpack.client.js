const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/client/App.js",
  target: "web",
  output: {
    filename: "client.esm.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: "babel-loader",
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/client/index.html",
    }),
  ],
};
