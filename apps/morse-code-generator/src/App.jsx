import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { isTriggered } from "@felvin-search/core";
import data from "./morseCode.json";


//------------Styled Components-------------
// If you're unfamiliar with styled components
// start here https://styled-components.com/docs/basics#getting-started

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const TextArea = styled.textarea`
  border: 1px solid #d0d0d0;
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
  resize: none;
  // display: block;
  // margin-left: auto;
  // margin_right: auto;
`;

const Button = styled.button`
  background-color: #4caf50; /* Green */
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
`;

const Result = styled.div`
  display: block;
  // justify-content: center;
  // align-items: center;
  // text-align: center;
  margin-left: 4rem;
  margin-right: 4rem;
`;
//=========================================

// Your UI logic goes here.

function Component({ data }) {
  return (
    <>
      <Container>
        <div>
          <h3>
            Covert Morse Code to Text Message or Text Message to Morse Code
          </h3>
          <h5>Note: In the Morse Code, code for every letter is separated by &lt;space&gt; and every word is separated by &lt;space&gt;|&lt;space&gt;</h5>
          <h5>Remember to input Morse Code correctly, if you want a proper decoded message!</h5>
          <TextArea
            id="input"
            rows={5}
            placeholder="Enter Text or Morse Code Here"
          />
          <br />
          <Button onClick={MorseTranslator}>Convert</Button>
        </div>
      </Container>
      <Result>
        <div id="MorseOutput">Morse Code:</div>
        <div id="TextOutput">Text:</div>
      </Result>
    </ >
  );
}

function flipObject(obj) {
  let characters = {},
    prop;

  for (prop in obj) characters[obj[prop]] = prop;

  return characters;
}

function text_to_morse(text) {
  text = text.toLowerCase();
  let morse = "";
  for (let i = 0; i < text.length; i++) {
    const ch = text.charAt(i);
    morse = morse + data[ch] + " ";
  }
  return morse;
}

function morse_to_text(morse) {
  let text = "";
  const characters = flipObject(data);
  const morse_array = morse.split(" ");
  morse_array.forEach((i) => {
    text = text + characters[i];
  });

  return text;
}

function encode(text) {
  let morse = text_to_morse(text);
  return morse;
}

function decode(morse) {
  let text = morse_to_text(morse);
  return text;
}

function isMorseCode(str) {
  for (let i = 0; i < str.length; i++)
    if (["|", "-", ".", " "].indexOf(str.charAt(i)) == -1) return false;
  return true;
}

function MorseTranslator() {
  let msgInput = document.getElementById("input");
  let mOutput = document.getElementById("MorseOutput");
  let tOutput = document.getElementById("TextOutput");

  if (isMorseCode(msgInput.value) == true) {
    let decoded = decode(msgInput.value);
    if (decoded.includes("undefined")) {
      tOutput.innerHTML = `Text: Morse Code could not be decoded.`;
    } else {
      tOutput.innerHTML = `Text: ${decoded}`;
    }
    mOutput.innerHTML = `Morse Code: ${msgInput.value}`;
  } else {
    let encoded = encode(msgInput.value);
    if (encoded.includes("undefined")) {
      mOutput.innerHTML = `Morse Code: Text message could not be encoded.`;
    } else {
      mOutput.innerHTML = `Morse Code: ${encoded}`;
    }
    tOutput.innerHTML = `Text: ${msgInput.value}`;
  }
}

// `data` prop is exactly what is returned by queryToData.
//=========================================

// This where you can process the query and try to convert it into some meaningful data.
const queryToData = ({ query }) => {
  if (!isTriggered(query, ["generateMorse", "generate Morse", "Morse to Text", "Text to Morse", "Morse generator"])) {
    return;
  }

  // You can do any external API call or use any library here
  // to convert the search query into some meaningful data.
  // The data gets passed to the UI Component defined above.

  const data = query.toUpperCase();

  return data;
};

export { queryToData, Component };