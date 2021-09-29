const path = require("path");

module.exports = {
  // TODO: Automate this using CLI
  entry: {
    "bouncy-ball": "../../apps/bouncy-ball/src/app.jsx",
    capitals: "../../apps/capitals/src/app.jsx",
    "csv-to-json": "../../apps/csv-to-json/src/app.jsx",
    "currency-convertor": "../../apps/currency-convertor/src/app.jsx",
  },
  target: "web",
  output: {
    // chunkFilename: "[id].esm.js",
    filename: "[id].esm.js",
    path: path.resolve(__dirname, "dist", "public"),
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
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
};
