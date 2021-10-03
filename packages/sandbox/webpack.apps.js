const path = require("path");

module.exports = {
  // TODO: Automate this using CLI
  entry: {
    "bouncy-ball": "../../apps/bouncy-ball/src/App.jsx",
    capitals: "../../apps/capitals/src/App.jsx",
    "csv-to-json": "../../apps/csv-to-json/src/App.jsx",
    "currency-convertor": "../../apps/currency-convertor/src/App.tsx",
    "tic-tac-toe": "../../apps/tic-tac-toe/src/App.jsx",
  },
  target: "web",
  output: {
    // chunkFilename: "[id].esm.js",
    // TODO: This should use the npm package name
    filename: "@felvin-search-apps/[id].esm.js",
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
