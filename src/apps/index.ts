/**
 * Note: Add a new import here when adding a new app.
 */
import { InstantApp } from "./types";
import dictionary from "./DictionaryApp";
import CurrencyConversionApp from "./CurrencyConversionApp";
import JSONFormatterApp from "./JSONFormatterApp";
import TimerApp from "./TimerApp";

/**
 * Note: Update me when adding a new app.
 */
const availableApps: Array<InstantApp> = [
  JSONFormatterApp,
  dictionary,
  CurrencyConversionApp,
  TimerApp,
];

export default availableApps;
