/**
 * Note: Add a new import here when adding a new app.
 */
// import myApp from "./myApp";
import CurrencyConversionApp from "./CurrencyConversionApp";
import dictionary from "./DictionaryApp";
import JSONFormatterApp from "./JSONFormatterApp";
import LoremIpsumGenerator from "./LoremIpsumGenerator";
import TicTacToe from "./TicTacToe";
import TimerApp from "./TimerApp";
import LatexRenderer from "./LatexRender";
import { InstantApp } from "./types";
import BouncyBall from "./BouncyBall";

const availableApps: Array<InstantApp> = [
  /**
   * Note: Update me when adding a new app.
   */
  // myApp,
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
