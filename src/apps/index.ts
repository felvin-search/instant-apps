/**
 * Note: Add a new import here when adding a new app.
 */
import CurrencyConversionApp from "./CurrencyConversionApp";
import dictionary from "./DictionaryApp";
import JSONFormatterApp from "./JSONFormatterApp";
import LoremIpsumGenerator from "./LoremIpsumGenerator";
import TicTacToe from "./TicTacToe";
import TimerApp from "./TimerApp";
import LatexRenderer from "./LatexRender"
import { InstantApp } from "./types";

/**
 * Note: Update me when adding a new app.
 */
const availableApps: Array<InstantApp> = [
  LoremIpsumGenerator,
  TicTacToe,
  JSONFormatterApp,
  dictionary,
  CurrencyConversionApp,
  TimerApp,
  LatexRenderer
];

export default availableApps;
