import { InstantApp } from "@felvin-search/core";
import { Component, queryToData } from "./App";

const App: InstantApp = {
  id: "@felvin-community/bmiconverter",
  name: "bmi-converter",
  description: "calculate bmi ",
  queryToData,
  Component,
  screenshotPath: "./files/screenshot.png",
  exampleSearchQueries: [["BMI", "BMI CALCULATOR"]],
};

export default App;
