import React, { useState } from "react";
import styled from "styled-components";
import { isTriggered } from "@felvin-search/core";

//------------Styled Components-------------
// If you're unfamiliar with styled components
// start here https://styled-components.com/docs/basics#getting-started

const TextBox = styled.input.attrs({ type: "text" })`
  width: 100%;
  font: inherit;
`;

const ButtonEnc = styled.button`
  font: inherit;
  cursor: pointer;

  background: red;
  margin: 0.8rem 1rem 0 0;
  color: white;
`;

const ButtonDec = styled(ButtonEnc)`
  background: green;
`;

const ButtonCopy = styled(ButtonEnc)`
  background: blue;
`;

//=========================================

// Your UI logic goes here.
// `data` prop is exactly what is returned by queryToData.
function Component({ data }) {
  const [url, seturl] = useState("");

  const onChangeHandler = (event) => {
    seturl(event.target.value);
  };

  const handleEncode = () => {
    seturl(encodeURIComponent(url));
  };

  const handleDecode = () => {
    seturl(decodeURIComponent(url));
  };

  const handleCopy = async (event) => {
    await navigator.clipboard.writeText(url).then(
      function () {
        event.target.innerHTML = "Copied";
        setTimeout(() => {
          event.target.innerHTML = "Copy";
        }, 1000);
      },
      function (err) {
        console.error("Async: Could not copy url: ", err);
      }
    );
  };

  return (
    <div>
      <div>
        <TextBox
          placeholder="Enter url here..."
          value={url}
          onChange={onChangeHandler}
        />
        <ButtonEnc onClick={handleEncode}>Encode</ButtonEnc>
        <ButtonCopy onClick={handleCopy}>Copy</ButtonCopy>
        <ButtonDec onClick={handleDecode}>Decode</ButtonDec>
      </div>
    </div>
  );
}

//=========================================

// This where you can process the query and try to convert it into some meaningful data.
const queryToData = async ({ query }) => {
  if (
    !isTriggered(
      query,
      ["url decoder", "url encoder", "encoding url", "decoding url"],
      { substringMatch: true }
    )
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
