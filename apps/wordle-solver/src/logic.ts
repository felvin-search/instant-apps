import { wordleListByDay } from "./wordleLists";

export default function getListOfWords(word, wordColor, alphaDict) {
  let words = [...wordleListByDay];
  for (let i = 0; i < 5; i++) {
    if (wordColor[i] === "#538d4e") {
      words = words.filter((a) => word[i].toLowerCase() === a.split("")[i]);
    } else if (wordColor[i] === "#b59f3b") {
      words = words.filter(
        (a) =>
          a.split("").includes(word[i].toLowerCase()) &&
          a.split("")[i] != word[i].toLowerCase()
      );
    }
  }
  let notUsedLetters = Object.keys(alphaDict).filter(
    (key) => alphaDict[key] === "#3a3a3c"
  );

  if (notUsedLetters.length) {
    words.forEach((a) => {
      notUsedLetters.forEach((b) => {
        if (a.split("").includes(b.toLowerCase())) {
          words = words.filter((c) => a != c);
        }
      });
    });
  }
  return words.slice(0, 10);
}
