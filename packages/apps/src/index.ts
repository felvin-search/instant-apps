import AddressPincodes from "@felvin-community/address-pincodes";
import AsciiArt from "@felvin-community/ascii-art";
import AsyncApiValidator from "@felvin-community/async-api-validator";
import Bmiconverter from "@felvin-community/bmiconverter";
import bouncyBall from "@felvin-community/bouncy-ball";
import capitals from "@felvin-community/capitals";
import CodeReference from "@felvin-community/code-reference";
import ColorPicker from "@felvin-community/color-picker";
import CompetitiveContestApp from "@felvin-community/competitive-contest-app";
import Compressify from "@felvin-community/compressify";
import Constants from "@felvin-community/constants";


const allApps = [
  AddressPincodes,
  AsciiArt,
  AsyncApiValidator,
  Bmiconverter,
  bouncyBall,
  capitals,
  CodeReference,
  ColorPicker,
  CompetitiveContestApp,
  Compressify,
  Constants
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
