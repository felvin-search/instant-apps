Runbook

- Create folder inside apps/<app-id>
- Create package.json

{
"name": "@felvin-search-apps/",
"version": "1.0.0",
"license": "MIT",
"private": false,
"main": "./src/index.ts",
"publishConfig": {
"access": "public",
"main": "./dist/index.cjs.js",
"types": "./dist/index.d.ts"
},
"dependencies": {
"@felvin-search/core": "^1.0.0",
"react": "^17.0.2",
"styled-components": "^5.3.1"
}
}

- Create src/index.ts

import { InstantApp } from "@felvin-search/core";
import { Component, queryToData } from "./App";

const App: InstantApp = {
id: "@felvin-search-apps/",
name: "",
description: "",
queryToData,
Component,
};
export default App;

- Rename whatever file to App.tsx or App.jsx
- Add import React
- Refactor App.jsx/tsx to export Component and queryToData

export { queryToData, Component };

- Update packages/apps array
- Run yarn install
- Restart webpack
- Check if app is working.

- [x] BouncyBall

- [ ] Plotter
      Sahil

- [ ] CurrencyConversionApp
      Sahil

- [ ] TicTacToe
      Sahil

- [ ] joke
      Sahil

- [ ] DiceRoller
      Sahil

- [ ] TimerApp
      Sahil

- [ ] snake
      Sahil

- [ ] DictionaryApp
      Sahil

- [ ] WordCounter
      Himanshu

- [ ] time
      Himanshu

- [ ] FlappyBird
      Himanshu

- [ ] calculator
      Himanshu

- [ ] JSONFormatterApp
      Himanshu

- [ ] capitals
      Himanshu

- [ ] uuid
      Himanshu

- [ ] LatexRender
      Himanshu

- [ ] LoremIpsumGenerator
      Himanshu

- [x] csvToJson
      Himanshu
