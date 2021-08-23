## Running apps locally

### Prerequisites

- [Node.js](https://nodejs.org/en/)
  - We recommended to use [nvm](https://github.com/nvm-sh/nvm) to install Node v14
- [yarn 1.x](https://classic.yarnpkg.com/en/docs/install)
  - We use yarn as our package manager, over npm cli.

### Starting up

Fork the repository and clone it locally. [Docs](https://docs.github.com/en/get-started/quickstart/fork-a-repo)

```
yarn install
yarn start
```

This should start the search website sandbox with all the plugins loaded!

## Creating a new app

### 1. Run the generator script
`yarn create-app`

### 2. Import

Import your app inside `src/apps/index.ts` and update the `availableApps` list.

```diff
# File: src/apps/index.ts
import dictionary from "./dictionary";
import CurrencyConversionApp from "./CurrencyConversionApp"
import JSONFormatterApp from "./JSONFormatterApp"
++ import myApp from "./myApp";

const availableApps: Array<InstantApp> = [
++ myApp
  JSONFormatterApp,
  dictionary,
  CurrencyConversionApp,
];

export default availableApps;
```

### 3. Start

Run `yarn start` to start the app. [Search "my app" to test out your first felvin instant app!](http://localhost:3000/search?q=my%20app).
Edit `src/apps/myApp.js` to make it whatever you want. Happy Hacking! 🚀

<!-- Note: Maybe restart isn't needed because of hot reloading. To be verified. -->
