const path = require("path");
const nodeExternals = require("webpack-node-externals");

module.exports = {
  entry: "./src/server/index.js",
  target: "node",
  externals: [nodeExternals()],

  output: {
    path: path.resolve("dist"),
    filename: "server.cjs.js",
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react",
              "@babel/preset-typescript",
            ],
            plugins: [
              "babel-plugin-styled-components",
              [
                "@babel/plugin-transform-runtime",
                {
                  corejs: 2,
                },
              ],
            ],
          },
        },
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "ts-loader",
        },
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
};
