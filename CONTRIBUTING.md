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

### 2. Import

Import your app inside `src/apps/index.ts` and update the `availableApps` list.

```diff
# File: src/apps/index.ts
import dictionary from "./dictionary";
import CurrencyConversionApp from "./CurrencyConversionApp"
import JSONFormatterApp from "./JSONFormatterApp"
++ import myNewApp from "./myNewApp";

const availableApps: Array<InstantApp> = [
++ myNewApp
  JSONFormatterApp,
  dictionary,
  CurrencyConversionApp,
];

export default availableApps;
```

### 3. Restart

Kill `yarn start` and run it again. And searching to test out your app!

<!-- Note: Maybe restart isn't needed because of hot reloading. To be verified. -->
