import React, { useState } from "react";
import styled from "styled-components";
import { isTriggered } from "@felvin-search/core";
import randomstring from "randomstring";
import * as Icon from "react-feather";

//------------Styled Components-------------
// If you're unfamiliar with styled components
// start here https://styled-components.com/docs/basics#getting-started
const primaryColor = "#5829f5";

const Container = styled.div`
  width: 50vw;
  min-height: 8rem;
  display: flex;
  padding: 2rem;
  //padding-left: 2rem;
  background-color: #fafafa;
  flex-direction: column;
`;

const OutputContainer = styled.div`
  margin-bottom: 2rem;
  line-height: 3rem;
  flex-wrap: wrap;
  display: flex;
  align-items: center;
  width: 100%;
`;
const OutPutString = styled.b`
  //line-break: auto;
  width: 75%;
  overflow-x: scroll;
  margin-right: 10px;
`;
const Gap = styled.div`
  width: 10px;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Label = styled.label`
  margin: 0.25rem 0;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;

const Submit = styled.button.attrs({ type: "submit" })`
  border: none;
  background: transparent;
  padding: 0;
  margin: 0;
  outline: 0;
  display: flex;
  align-items: center;
  cursor: pointer;
`;
const CheckBoxes = styled.div`
  display: flex;
  justify-content: space-between;
  width: 65%;
  margin-top: 1rem;
  flex-wrap: wrap;
`;
const DisplayLength = styled.div`
  height: 15px;
  aspect-ratio: 1;
  border: 1px solid #c3c1c196;
  padding: 0.2em 0.4em;
  text-align: center;
`;
const CopyBtn = styled.button`
  border: none;
  background: transparent;
  padding: 0;
  margin: 0;
  outline: 0;
  cursor: pointer;
`;

const RangeInput = styled.input.attrs({ type: "range" })`
  -webkit-appearance: none;
  -moz-appearance: none;
  -ms-progress-appearance: none;
  
  appearance: none;
  width: 100px;
  height: 5px;
  background: #ededed;
  border-radius: 5px;
  background-repeat: no-repeat;
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    background: none;
    height: 15px;
    width: 15px;
    border-radius: 50%;
    background: ${primaryColor};
    cursor: ew-resize;
  }
  &::-moz-range-thumb {
    -moz-appearance: none;
    background: none;
    height: 15px;
    width: 15px;
    border-radius: 50%;
    background: ${primaryColor};
    cursor: ew-resize;
  }
  &::-ms-thumb {
    -ms-progress-appearance: none;
    background: none;
    height: 15px;
    width: 15px;
    border-radius: 50%;
    background: ${primaryColor};
    cursor: ew-resize;
  }
  @media (max-width: 380px) {
    margin-top: 1.3rem;
  }
`;
const CheckBox = styled.input.attrs({ type: "checkbox" })`
  accent-color: ${primaryColor};
  margin-left:0;
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
  const [isCustomCharset, setCustomCharset] = useState(false);
  const [userCharset, setUserCharset] = useState("");
  const [length, setLength] = useState(32);
  const [randomString, setRandomString] = useState(randomstring.generate());
  const [isCopied, setIsCopied] = useState(false);
  const capitalLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const smallLetters = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const symbols = "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";

  const handleSubmit = (e) => {
    e.preventDefault();
    let charset = "";

    if (isCustomCharset) {
      charset = userCharset;
    } else {
      if (isCapitalLetter) charset = charset + capitalLetters;
      if (isSmallLetter) charset = charset + smallLetters;
      if (isNumber) charset = charset + numbers;
      if (isSymbol) charset = charset + symbols;
    }
    setRandomString(getString(length, charset));
  };
  const handleCopy = (clip) => {
    clip.writeText(randomString).then(() => {
      setIsCopied(true);

      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    });
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <OutputContainer>
          <Submit value="Generate">
            <Icon.RefreshCcw color="#AFAFAF" />
          </Submit>
          <Gap />
          <OutPutString>{randomString}</OutPutString>

          <CopyBtn
            type="button"
            onClick={() => handleCopy(navigator.clipboard)}
          >
            {!isCopied ? (
              <Icon.Copy color="#AFAFAF" />
            ) : (
              <Icon.Check color="#AFAFAF" />
            )}
          </CopyBtn>
        </OutputContainer>
        <Label>
          Length
          <Gap />
          <DisplayLength>{length}</DisplayLength>
          <Gap />
          <RangeInput
            min={5}
            max={50}
            step={1}
            value={length}
            onChange={(e) => setLength(e.target.value)}
          />
          {/* <input
            type={"range"}
            min={5}
            max={50}
            step={1}
            value={length}
            onChange={(e) => setLength(e.target.value)}
          /> */}
        </Label>
        <CheckBoxes>
          <Label>
            <CheckBox
              type="checkbox"
              checked={isCapitalLetter}
              onChange={() => setCapitalLetter(!isCapitalLetter)}
            />
            Capital Letters
          </Label>
          <Label>
            <CheckBox
              type="checkbox"
              checked={isSmallLetter}
              onChange={() => setSmallLetter(!isSmallLetter)}
            />
            Small Letters
          </Label>
          <Label>
            <CheckBox
              type="checkbox"
              checked={isNumber}
              onChange={() => setNumber(!isNumber)}
            />
            Numbers
          </Label>
          <Label>
            <CheckBox
              type="checkbox"
              checked={isSymbol}
              onChange={() => setSymbol(!isSymbol)}
            />
            ASCII symbols
          </Label>
        </CheckBoxes>
        {/* 
        <Label>
          Length of string (in characters)
          <br />
          <input
            type="number"
            value={length}
            onChange={(e) => setLength(e.target.value)}
          />
        </Label> */}
        {/* <Label>
          <input
            type="checkbox"
            checked={isCustomCharset}
            onChange={() => setCustomCharset(!isCustomCharset)}
          />
          {`Use custom character set (abc >> "accbaabbbbcccb")`}
          <br />
          <input
            type="text"
            value={userCharset}
            onChange={(e) => setUserCharset(e.target.value)}
          />
        </Label> */}
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
