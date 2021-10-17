import React, { useState } from "react";
import styled from "styled-components";
import { SketchPicker } from "react-color";
import { isTriggered, Breakpoints } from "@felvin-search/core";

//------------Styled Components-------------
// If you're unfamiliar with styled components
// start here https://styled-components.com/docs/basics#getting-started

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 70vw;
  flex-direction: column;
  @media (min-width: ${Breakpoints.small || "425px"}) {
    flex-direction: row;
  }
`;

const Image = styled.div`
  background-color: ${(props) => props.color.background.hex};
  height: 30vw;
  width: 15rem;
  max-height: 15rem;

  margin: 0.5rem;
  box-sizing: border-box;
  border-radius: 20px;
  box-shadow: 0px 0px 20px 8px rgb(0 0 0 / 10%);
`;

//=========================================

// Your UI logic goes here.
// `data` prop is exactly what is returned by queryToData.
function Component({ data }) {
  const [color, setColor] = useState({
    background: {
      rgb: {
        r: 33,
        b: 143,
        g: 34,
        a: 1,
      },
      hex: "#21228f",
      hsl: {
        a: 1,
        h: 239,
        l: 0,
        s: 5,
      },
    },
  });
  const handleChangeComplete = (color) => {
    setColor({
      background: {
        rgb: color.rgb,
        hex: color.hex,
        hsl: color.hsl,
      },
    });
  };
  return (
    <Container>
      <Image color={color} />

      <SketchPicker
        disableAlpha={true}
        presetColors={[
          "#D0021B",
          "#F5A623",
          "#F8E71C",
          "#8B572A",
          "#7ED321",
          "#417505",
          "#BD10E0",
          "#9013FE",
        ]}
        color={color.background.rgb}
        onChangeComplete={handleChangeComplete}
      />
    </Container>
  );
}

//=========================================

// This where you can process the query and try to convert it into some meaningful data.
const queryToData = ({ query }) => {
  if (!isTriggered(query, ["color picker", "rgb color picker", "hex color"])) {
    return;
  }

  // You can do any external API call or use any library here
  // to convert the search query into some meaningful data.
  // The data gets passed to the UI Component defined above.

  const data = query.toUpperCase();

  return data;
};

export { queryToData, Component };
