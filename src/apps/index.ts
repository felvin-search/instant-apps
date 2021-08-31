/**
 * Note: Add a new import here when adding a new app.
 */
import CurrencyConversionApp from "./currency";
import dictionary from "./dictionary";
import JSONFormatterApp from "./JSONFormatterApp";
import TicTacToe from "./TicTacToe";
import TimerApp from "./TimerApp";
import { InstantApp } from "./types";

/**
 * Note: Update me when adding a new app.
 */
const availableApps: Array<InstantApp> = [
  TicTacToe,
  JSONFormatterApp,
  dictionary,
  CurrencyConversionApp,
  TimerApp,
];

export default availableApps;
