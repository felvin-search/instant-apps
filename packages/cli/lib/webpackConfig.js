const path = require("path");
const fs = require("fs");

// Path to where the instant app's package.json lives.
const appPath = process.cwd();
const rootPath = path.dirname(path.dirname(appPath));
console.log(path.join(rootPath, "tsconfig.json"));

// Read package.json
const packageJson = JSON.parse(fs.readFileSync("package.json", "utf-8"));

const browserEntrypoint = packageJson?.browser;
const serverEntrypoint = packageJson?.main;

const moduleConfig = {
  rules: [
    {
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: {
        loader: "babel-loader",
        options: {
          presets: [
            "@babel/preset-env",
            "@babel/preset-react",
            "@babel/preset-typescript",
          ],
          plugins: ["babel-plugin-styled-components"],
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
  ],
};

const serverConfig = {
  mode: "production",
  entry: serverEntrypoint,
  context: appPath,
  target: "node",
  module: moduleConfig,
  output: {
    path: path.resolve(appPath, "dist"),
    filename: "index.cjs.js",
    library: {
      type: "commonjs",
    },
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
};

const clientConfig = {
  mode: "production",
  entry: browserEntrypoint,
  context: appPath,
  target: "web",
  output: {
    path: path.resolve(appPath, "dist"),
    filename: "index.esm.js",
  },
  module: moduleConfig,
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
};

let configs = [];

if (browserEntrypoint) configs.push(clientConfig);
if (serverEntrypoint) configs.push(serverConfig);

module.exports = configs;
