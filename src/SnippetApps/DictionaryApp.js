import React from "react";
import axios from "axios";

// Keep the logic of making the API call seperate from the component definition
// Ideally the component shouldn't make an API call.
// We should give lot of example snippet apps which people can fork and create their own apps
// The single API end point waala cheez might restrict people
// People might want to do make all kind of api calls and do lot of random stuff, maybe we should allow it
// In terms of libraries and all, we can install most of the popular libraries
// We'll need to balance performance & customizability

const dictionarySampleData = [
  {
    word: "grit",
    phonetics: [
      {
        text: "/ɡrɪt/",
        audio: "https://lex-audio.useremarkable.com/mp3/grit_us_1.mp3",
      },
    ],
    meanings: [
      {
        partOfSpeech: "transitive verb",
        definitions: [
          {
            definition: "Move with or make a grating sound.",
            synonyms: [
              "clench",
              "clamp together",
              "press together",
              "shut tightly",
            ],
            example: "fine red dust that gritted between the teeth",
          },
        ],
      },
      {
        partOfSpeech: "noun",
        definitions: [
          {
            definition: "Small loose particles of stone or sand.",
            synonyms: [
              "gravel",
              "pebbles",
              "stones",
              "shingle",
              "sand",
              "dust",
              "dirt",
            ],
            example: "she had a bit of grit in her eye",
          },
          {
            definition: "Courage and resolve; strength of character.",
            synonyms: [
              "courage",
              "courageousness",
              "bravery",
              "pluck",
              "mettle",
              "mettlesomeness",
              "backbone",
              "spirit",
              "strength of character",
              "strength of will",
              "moral fibre",
              "steel",
              "nerve",
              "gameness",
              "valour",
              "fortitude",
              "toughness",
              "hardiness",
              "resolve",
              "determination",
              "resolution",
            ],
            example: "he displayed the true grit of the navy pilot",
          },
        ],
      },
    ],
  },
];

function Definition(props) {
  const definition = props.data;
  return (
    <div className="p-1">
      <div className="text-lg">{definition.definition}</div>
      {definition.synonyms && (
        <div className="flex flex-row">
          <div className="px-0.5 text-black">Synonyms:</div>
          <div className="italic">{definition.synonyms.join(", ")}</div>
        </div>
      )}
    </div>
  );
}

function Dictionary(props) {
  console.log("Dictionary Render");
  console.log(props);
  const data = props.data[0];
  return (
    <div className="m-2 p-3">
      <div className="text-gray-700 break-words font-bold text-xl mb-2">
        {data.word}
      </div>
      <div className="flex flex-row">
        <div className="px-1">{data.phonetics[0]?.text}</div>
        <audio controls src={data.phonetics[0]?.audio}>
          Your browser does not support the
          <code>audio</code> element.
        </audio>
      </div>
      <div>
        {data.meanings &&
          data.meanings.map((m, index) => {
            return (
              <div className="p-2">
                <div>{index}.</div>
                <div className="px-2">
                  <div className="italic">{m.partOfSpeech}</div>
                  {m.definitions.map((d) => (
                    <Definition data={d} />
                  ))}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

async function fetchMeaningData({ query }) {
  const { data } = await axios.get(
    `https://api.dictionaryapi.dev/api/v2/entries/en_US/${query}`
  );
  return data;
}

// Accept an object, gives you more flexibility
const DictionaryApp = {
  name: "Dictionary App",
  id: "dictionary",
  description:
    "I am simple dictionary app, give me a word, I'll tell you its meaning",
  logo:
    "https://upload.wikimedia.org/wikipedia/commons/4/4b/Books-aj.svg_aj_ashton_01.svg",
  dataFetcher: fetchMeaningData,
  renderer: Dictionary,
};

export default DictionaryApp;
