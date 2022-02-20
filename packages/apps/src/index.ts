import CheatSh from "@felvin-community/cheat-sh";
import Tldr from "@felvin-community/tldr";
import ConvertToRoman from "@felvin-community/convert-to-roman";
import HttpStatusCodes from "@felvin-community/http-status-codes";
import AddressPincodes from "@felvin-community/address-pincodes";
import IsPrime from "@felvin-community/is-prime";
import CronParser from "@felvin-community/cron-parser";
import Metronome from "@felvin-community/metronome";
import Stopwatch from "@felvin-community/stopwatch";
import WhatDay from "@felvin-community/what-day";
import UrlEncoderDecoder from "@felvin-community/url-encoder-decoder";
import InstantAppDetails from "@felvin-community/instant-app-details";
import CodeReference from "@felvin-community/code-reference";
import UnixTimestamp from "@felvin-community/unix-timestamp";
import UnitSystem from "@felvin-community/unit-system";
import RandomStringGenerator from "@felvin-community/random-string-generator";
import Sudoku from "@felvin-community/sudoku";
import ColorPicker from "@felvin-community/color-picker";
import MergePdfs from "@felvin-community/merge-pdfs";
import HelloWorldInDifferentLanguages from "@felvin-community/hello-world-in-different-languages";
import Compressify from "@felvin-community/compressify";
import TrendingOnGithub from "@felvin-community/trending-on-github";
import UrlShortener from "@felvin-community/url-shortener";
import TvShows from "@felvin-community/tv-shows";
import Pokedex from "@felvin-community/pokedex";
import CropImage from "@felvin-community/crop-image";
import ImageUploader from "@felvin-community/image-uploader";
import UnitConvertor from "@felvin-community/unit-convertor";
import LiveMarkdown from "@felvin-community/live-markdown";
import JwtDecoder from "@felvin-community/jwt-decoder";
import MarkdownToHtml from "@felvin-community/markdown-to-html";
import FlipACoin from "@felvin-community/flip-a-coin";
import QrCodeGenerator from "@felvin-community/qr-code-generator";
import Crypto from "@felvin-community/crypto";
import WebsiteIcons from "@felvin-community/website-icons";
import WeightConverter from "@felvin-community/weight-converter";
import AsyncApiValidator from "@felvin-community/async-api-validator";
import MorseCodeGenerator from "@felvin-community/morse-code-generator";
import IpAddress from "@felvin-community/ip-address";
import Regex from "@felvin-community/regex";
import ScreenSize from "@felvin-community/screen-size";
import bouncyBall from "@felvin-community/bouncy-ball";
import csvToJson from "@felvin-community/csv-to-json";
import jsonToCsv from "@felvin-community/json-to-csv";
import loremIpsumGenerator from "@felvin-community/lorem-ipsum-generator";
import graphPlotter from "@felvin-community/graph-plotter";
import currencyConvertor from "@felvin-community/currency-convertor";
import latexRender from "@felvin-community/latex-render";
import uuid from "@felvin-community/uuid";
import capitals from "@felvin-community/capitals";
import jsonFormatter from "@felvin-community/json-formatter";
import math from "@felvin-community/math";
import flappyBird from "@felvin-community/flappy-bird";
import timeAtPlace from "@felvin-community/time-at-place";
import TicTacToe from "@felvin-community/tic-tac-toe";
import JokeGenerator from "@felvin-community/joke-generator";
import DiceRoller from "@felvin-community/dice-roller";
import Timer from "@felvin-community/timer";
import SnakeGame from "@felvin-community/snake-game";
import Dictionary from "@felvin-community/dictionary";
import WordCounter from "@felvin-community/word-counter";
import Tetris from "@felvin-community/tetris";
import CourierTracker from "@felvin-community/courier-tracker";
import YamlToJson from "@felvin-community/yaml-to-json"

const allApps = [
  Tldr,
  YamlToJson,
  ConvertToRoman,
  HttpStatusCodes,
  AddressPincodes,
  IsPrime,
  CronParser,
  Metronome,
  Stopwatch,
  WhatDay,
  UrlEncoderDecoder,
  InstantAppDetails,
  CodeReference,
  UnixTimestamp,
  UnitSystem,
  RandomStringGenerator,
  Sudoku,
  ColorPicker,
  MergePdfs,
  HelloWorldInDifferentLanguages,
  Compressify,
  TrendingOnGithub,
  UrlShortener,
  Pokedex,
  CropImage,
  ImageUploader,
  UnitConvertor,
  LiveMarkdown,
  JwtDecoder,
  MarkdownToHtml,
  FlipACoin,
  QrCodeGenerator,
  Crypto,
  WebsiteIcons,
  WeightConverter,
  AsyncApiValidator,
  MorseCodeGenerator,
  IpAddress,
  Regex,
  ScreenSize,
  bouncyBall,
  csvToJson,
  jsonToCsv,
  loremIpsumGenerator,
  graphPlotter,
  currencyConvertor,
  latexRender,
  uuid,
  capitals,
  jsonFormatter,
  math,
  flappyBird,
  timeAtPlace,
  TicTacToe,
  JokeGenerator,
  DiceRoller,
  Timer,
  SnakeGame,
  Dictionary,
  WordCounter,
  Tetris,
  CourierTracker,
  TvShows,
  CheatSh,
];

export default allApps;

export const appDetails = allApps.map(
  ({ id, name, description, screenshotPath, exampleSearchQueries }) => {
    const details = {
      id,
      name,
      description,
      screenshotPath,
      exampleSearchQueries,
    };
    details.screenshotPath =
      "https://raw.githubusercontent.com/felvin-search/instant-apps/master/apps/" +
      id.split("/")[1] +
      "/src" +
      screenshotPath?.substring(1);
    return details;
  }
);
