import React, { useState } from "react";
import styled from "styled-components";
import { isTriggered } from "@felvin-search/core";
import randomstring from "randomstring";

//------------Styled Components-------------
// If you're unfamiliar with styled components
// start here https://styled-components.com/docs/basics#getting-started

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const OutputContainer = styled.div`
  width: 40rem;
  overflow: auto;
  line-height: 2rem;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin: 0.25rem 0;
`;

const Submit = styled.input.attrs({ type: "submit" })`
  background: transparent;
  cursor: pointer;
  padding: 0.5rem 1.5rem;
  border-radius: 0.5rem;
  width: 9rem;
  font-weight: bold;
  margin: 1rem auto;
`;

//=========================================

const getString = (length, charset) => {
  return randomstring.generate({ length, charset });
};

// Your UI logic goes here.
// `data` prop is exactly what is returned by queryToData.
function Component({ data }) {
  const [isCapitalLetter, setCapitalLetter] = useState(true);
  const [isSmallLetter, setSmallLetter] = useState(true);
  const [isNumber, setNumber] = useState(true);
  const [isSymbol, setSymbol] = useState(false);
  const [length, setLength] = useState(32);
  const [randomString, setRandomString] = useState(randomstring.generate());

  const capitalLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const smallLetters = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const symbols = "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";

  const handleSubmit = (e) => {
    e.preventDefault();
    let charset = "";

    if (isCapitalLetter) charset = charset + capitalLetters;
    if (isSmallLetter) charset = charset + smallLetters;
    if (isNumber) charset = charset + numbers;
    if (isSymbol) charset = charset + symbols;

    setRandomString(getString(length, charset));
  };

  return (
    <Container>
      <OutputContainer>
        Your random string is: <br />
        {randomString}
      </OutputContainer>
      <br />
      <Form onSubmit={handleSubmit}>
        <Label>
          <input
            type="checkbox"
            checked={isCapitalLetter}
            onChange={() => setCapitalLetter(!isCapitalLetter)}
          />
          Include capital letters (A-Z)
        </Label>
        <Label>
          <input
            type="checkbox"
            checked={isSmallLetter}
            onChange={() => setSmallLetter(!isSmallLetter)}
          />
          Include small letters (a-z)
        </Label>
        <Label>
          <input
            type="checkbox"
            checked={isNumber}
            onChange={() => setNumber(!isNumber)}
          />
          Include numbers (0-9)
        </Label>
        <Label>
          <input
            type="checkbox"
            checked={isSymbol}
            onChange={() => setSymbol(!isSymbol)}
          />
          Include ascii symbols (!@#$...)
        </Label>
        <Label>
          Length of string (in characters)
          <br />
          <input
            type="number"
            value={length}
            onChange={(e) => setLength(e.target.value)}
          />
        </Label>
        <Submit value="Generate" />
      </Form>
    </Container>
  );
}

//=========================================

// This where you can process the query and try to convert it into some meaningful data.
const queryToData = ({ query }) => {
  if (
    !isTriggered(query, [
      "random password",
      "random string",
      "new password",
      "new string",
    ])
  ) {
    return;
  }

  // You can do any external API call or use any library here
  // to convert the search query into some meaningful data.
  // The data gets passed to the UI Component defined above.

  const data = query.toUpperCase();

  return data;
};

export { queryToData, Component };
