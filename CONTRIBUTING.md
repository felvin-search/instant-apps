# Running apps locally

## Workspace Setup

This setup is recommended but not enforced. Please note that we expect clean well formated code and these tools make it easier for us to have a consistent code style throughout the codebase.

### Node.js

We recommended to use [nvm](https://github.com/nvm-sh/nvm) to install Node v14

### Yarn

We use [yarn](https://yarnpkg.com/en/) as the package manager. Please do not use `npm` with this project to manage dependencies. It will result in clashing dependencies and may cause unintended errors.

To add new dependency use `yarn add`, so if you need to run `npm install <package>` run `yarn add <package>`.

### VSCode

The text editor of choice. You can choose any other as long as they support [prettier](https://prettier.io/).

#### Extension - [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

We have a `.prettierrc.json` file, which would make prettier consisitent across all the developers of the project.

#### Extension - [ESlint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

#### Configuration - Settings.json

```json
{
  "files.trimTrailingWhitespace": true,
  "editor.formatOnSave": true,
  "eslint.autoFixOnSave": true,
  "eslint.alwaysShowStatus": true,
  "javascript.updateImportsOnFileMove.enabled": "always"
}
```

## Starting up

Fork the repository and clone it locally. [Docs](https://docs.github.com/en/get-started/quickstart/fork-a-repo)

```
yarn install
yarn start
```

This should start the search website sandbox with all the plugins loaded!

# Creating a new app

## 1. Run the generator script

`yarn create-app`

## 2. Import

Import your app inside `src/apps/index.ts` and update the `availableApps` list.

```diff
# File: src/apps/index.ts
import dictionary from "./dictionary";
import CurrencyConversionApp from "./CurrencyConversionApp"
import JSONFormatterApp from "./JSONFormatterApp"
++ import MyApp from "./myApp";

const availableApps: Array<InstantApp> = [
++ MyApp
  JSONFormatterApp,
  dictionary,
  CurrencyConversionApp,
];

export default availableApps;
```

## 3. Start

Run `yarn start` to start the app. [Search "my app" to test out your first felvin instant app!](http://localhost:3000/search?q=my%20app).
Edit `src/apps/myApp.js` to make it whatever you want. Happy Hacking! 🚀

<!-- Note: Maybe restart isn't needed because of hot reloading. To be verified. -->
