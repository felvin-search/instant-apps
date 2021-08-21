//  We can make multiple theme objects and add link them in `Theme` object
// when it would come to implementing multiple themes

const Theme = {
  backgroundColor: "#FFF",

  inputBox: {
    backgroundColor: "#fafafa",
    borderColor: "#ededed",
    placeholderColor: "#c0c0c0",
  },

  searchResults: {
    titleColor: "#000",
    visitedColor: "#888",
    snippetColor: "#4d5156",
    linkColor: "#878787",
  },
};

type ThemeType = {
  backgroundColor: string;

  inputBox: {
    backgroundColor: string;
    borderColor: string;
    placeholderColor: string;
  };

  searchResults: {
    titleColor: string;
    visitedColor: string;
    snippetColor: string;
    linkColor: string;
  };
};

export type { ThemeType };
export default Theme;
