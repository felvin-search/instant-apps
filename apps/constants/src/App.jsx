import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { isTriggered } from "@felvin-search/core";
import { constants } from "./utils/Constants";

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
    { data[0].unit && <div>Unit : {data[0].unit}</div>}
    </Container>
  );
}


const queryToData = async ({ query }) => {
  query = query.toLowerCase();
  //use to extract keywords from the strings
  let R = /(\w|\s)*\w(?=")|\w+/g;
  let filteredQuery = query.match(R);
  const data = constants.filter((key) => {
    return key.name.toLowerCase().includes(filteredQuery[0]);
  });
 

  return data;
};

export { queryToData, Component };
