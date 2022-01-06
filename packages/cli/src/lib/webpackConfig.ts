import path from "path";
import fs from "fs-extra";

import NodePolyfillPlugin from "node-polyfill-webpack-plugin";
// Path to where the instant app's package.json lives.
const appPath = process.cwd();
console.log(`Running build:app inside ${appPath}`);
const rootPath = path.dirname(path.dirname(appPath));

// Read package.json
const packageJson = fs.readJsonSync("package.json");
const entrypoint = packageJson?.main;

export default {
  entry: entrypoint,
  target: "web",
  output: {
    path: path.resolve(appPath, "dist"),
    filename: "index.cjs.js",
    publicPath: "",
    library: {
      type: "commonjs",
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
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
          options: {
            configFile: path.join(rootPath, "tsconfig.json"),
          },
        },
      },
      // Effective CSS loading https://stackoverflow.com/a/61761653/4698026
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"], // load project styles via style-loader
        // exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
  plugins: [new NodePolyfillPlugin()],
  // https://styled-components.com/docs/faqs#i-am-a-library-author-should-i-bundle-styledcomponents-with-my-library
  externals: {
    "styled-components": {
      commonjs: "styled-components",
      commonjs2: "styled-components",
      amd: "styled-components",
    },
    react: {
      commonjs: "react",
      commonjs2: "react",
      amd: "react",
    },
    "react-dom": {
      commonjs: "react-dom",
      commonjs2: "react-dom",
      amd: "react-dom",
    },
  },
};
