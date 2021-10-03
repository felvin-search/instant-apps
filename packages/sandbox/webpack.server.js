const path = require("path");
const nodeExternals = require("webpack-node-externals");

module.exports = {
  entry: "./src/server/index.js",
  target: "node",
  externals: [nodeExternals()],

  output: {
    library: {
      type: "commonjs",
    },
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
            // https://stackoverflow.com/questions/52407499/how-do-i-use-babels-usebuiltins-usage-option-on-the-vendors-bundle
            sourceType: "unambiguous",
            ignore: [/\/core-js/, /\/web-streams-polyfill/],
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
      // Effective CSS loading https://stackoverflow.com/a/61761653/4698026
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"], // load project styles via style-loader
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ["to-string-loader", "css-loader"], // use to-string-loader for 3rd party css
        include: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
};
