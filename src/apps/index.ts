/**
 * Note: Add a new import here when adding a new app.
 */
// import myApp from "./myApp";
import BouncyBall from "./BouncyBall";
import calculator from "./calculator";
import CapitalsApp from "./capitals";
import CurrencyConversionApp from "./CurrencyConversionApp";
import dictionary from "./DictionaryApp";
import JokeApp from "./joke";
import JSONFormatterApp from "./JSONFormatterApp";
import LatexRenderer from "./LatexRender";
import LoremIpsumGenerator from "./LoremIpsumGenerator";
import TicTacToe from "./TicTacToe";
import time from "./time";
import TimerApp from "./TimerApp";
import { InstantApp } from "./types";
import uuid from "./uuid";

const availableApps: Array<InstantApp> = [
  /**
   * Note: Update me when adding a new app.
   */
  // myApp,
  JokeApp,
  CapitalsApp,
  uuid,
  calculator,
  time,
  BouncyBall,
  LoremIpsumGenerator,
  TicTacToe,
  JSONFormatterApp,
  dictionary,
  CurrencyConversionApp,
  TimerApp,
  LatexRenderer,
];

export default availableApps;
