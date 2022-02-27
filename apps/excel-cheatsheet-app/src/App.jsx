import React from "react";
import styled from "styled-components";
import { isTriggered } from "@felvin-search/core";

//------------Styled Components-------------
// If you're unfamiliar with styled components
// start here https://styled-components.com/docs/basics#getting-started

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

//=========================================

// Your UI logic goes here.
// `data` prop is exactly what is returned by queryToData.
function Component({ data }) {

  return (
    <Container>
      {/* <h1>{JSON.stringify(data)}</h1> */}
      <p>{data["Formula"]}</p>
      <p>{data["Explaination"]}</p>
      <img src={data["Gif"]} width="600" height="400"></img>

    </Container>
  );
}

//=========================================


async function queryToData({
  query,
}) {
  const sheetID = "1QadcLXlmxj_L5IbJkA0YN51vyZUpDx8AO6RfBjoMPlY";
  const response = await fetch(`https://low-code-service.felvin.com/api/${sheetID}`)
  const data = await response.json()
  for(const item of data){
    if(item["Search queries"] === query) {
      return item;
    }
  }
  return data;
}

export { queryToData, Component };
