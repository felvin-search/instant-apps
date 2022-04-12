import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { isTriggered } from "@felvin-search/core";
import { constants } from "./utils/data";
//------------Styled Components-------------
// If you're unfamiliar with styled components
// start here https://styled-components.com/docs/basics#getting-started

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 3rem;
  align-items: center;
  width: 50vw;
  min-height: 10rem;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
`;
const Symbols = styled.div`
  font-size: 2rem;
`;
const Gap=styled.div`
  height: 1rem;

`
//=========================================

// Your UI logic goes here.
// `data` prop is exactly what is returned by queryToData.
function Component({ data }) {
  console.log(data);

  return (
    <Container>
      <Symbols>
        Symbol : <b dangerouslySetInnerHTML={{ __html: data[0].symbol }}></b>
      </Symbols>
      <Gap/>
      <div>Name: {data[0].name}</div>
      <Gap/>
      <div>Value : {data[0].value}</div>
      <Gap/>
      <div>Unit : {data[0].unit}</div>
    </Container>
  );
}

//=========================================

// This where you can process the query and try to convert it into some meaningful data.
const queryToData = async ({ query }) => {
  query = query.toLowerCase();
  let R = /(\w|\s)*\w(?=")|\w+/g;
  let filteredQuery = query.match(R);
  const data = constants.filter((key) => {
    return key.name.toLowerCase().includes(filteredQuery[0]);
  });
  //console.log(filteredQuery);
  // You can do any external API call or use any library here
  // to convert the search query into some meaningful data.
  // The data gets passed to the UI Component defined above.

  return data;
};

export { queryToData, Component };
