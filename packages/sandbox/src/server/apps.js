import bouncyBall from "@felvin-search-apps/bouncy-ball";
import capitals from "@felvin-search-apps/capitals";
import csvToJson from "@felvin-search-apps/csv-to-json";
import currencyConvertor from "@felvin-search-apps/currency-convertor";
import diceRoller from "@felvin-search-apps/dice-roller";
import dictionary from "@felvin-search-apps/dictionary";
import jsonFormatter from "@felvin-search-apps/json-formatter";
// import latexRender from "@felvin-search-apps/latex-render";
// import loremIpsum from "@felvin-search-apps/lorem-ipsum-generator";
import math from "@felvin-search-apps/math";
import randomJoke from "@felvin-search-apps/random-joke";
// import ticTacToe from "@felvin-search-apps/tic-tac-toe";
// import time from "@felvin-search-apps/time";
// import timer from "@felvin-search-apps/timer";
import uuid from "@felvin-search-apps/uuid";

const apps = [
  bouncyBall,
  capitals,
  csvToJson,
  currencyConvertor,
  // TODO: Dice roller is not rendering for some reason. Could be dependency issue
  diceRoller,
  dictionary,
  jsonFormatter,
  // TODO: window is undefined
  // latexRender,
  // loremIpsum,
  math,
  randomJoke,
  // ticTacToe,
  // time,
  // timer,
  uuid,
];

export default apps;
