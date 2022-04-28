import React, { useState } from "react";
import styled from "styled-components";
import { isTriggered } from "@felvin-search/core";
import figlet from "figlet";
import standard from "figlet/importable-fonts/Standard.js";

//------------Styled Components-------------
// If you're unfamiliar with styled components
// start here https://styled-components.com/docs/basics#getting-started

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Clipboard = styled.button`
  margin: 0;
`;

//=========================================

// Your UI logic goes here.
// `data` prop is exactly what is returned by queryToData.
function Component({ data }) {
  const [text, setText] = useState("Awesome Felvin");
  var ascii;
  figlet.parseFont("Standard", standard);
  figlet.text(
    text,
    {
      font: "Standard",
      whitespaceBreak: true,
    },
    function (err, help) {
      ascii = help;
      console.log(data);
    }
  );

  return (
    <Container>
      <h2>ASCII ART</h2>
      <div>
        Enter the String to be converted to ASCII:
        <input value={text} onChange={(e) => setText(e.target.value)} />
      </div>
      <pre> {ascii} </pre>

      <Clipboard
        onClick={() => {
          navigator.clipboard.writeText(ascii);
        }}
      >
        Copy to Clipboard
      </Clipboard>
    </Container>
  );
}

//=========================================

// This where you can process the query and try to convert it into some meaningful data.
const queryToData = async ({ query }) => {
  if (!isTriggered(query, ["ascii art", "text to ascii"])) {
    return;
  }

  // You can do any external API call or use any library here
  // to convert the search query into some meaningful data.
  // The data gets passed to the UI Component defined above.

  const data = query.toUpperCase();

  return data;
};

export { queryToData, Component };
