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

<!-- TODO: add info about steps in create-app -->

## 2. Start

Run `yarn start` to start the app. Search trigger word you entered to test out your first felvin instant app!.

You can find you app in apps folder, edit `App.jsx` to make it do whatever you want. Happy Hacking! 🚀
