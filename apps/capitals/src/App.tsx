import { queryToDataInput } from "@felvin-search/core";
import React from "react";
import styled from "styled-components";
import capitalsData from "./files/capitalsData.json";

const Territory = styled.span`
  text-transform: capitalize;
`;

const Capital = styled.span`
  text-transform: capitalize;
  font-weight: bold;
`;

//=========================================

function Component({ data }) {
  return (
    <div>
      Capital of <Territory> {data.territory} </Territory> is{" "}
      <Capital>{data.capital}</Capital>
    </div>
  );
}

function territoryToCapital(territory: string) {
  return capitalsData.find(
    (elem) => elem.CountryName.toLowerCase() === territory.toLowerCase()
  )?.CapitalName;
}

const queryToData = async ({ query }: queryToDataInput) => {
  const normalizedQuery = query.toLowerCase();
  // Todo @Harsh: There is probably a smarter way to do this
  // Todo @Harsh: Replace this with a standard utility function
  const triggerQueries = [
    "what is the capital of",
    "what is capital of",
    "capital of",
    "capital",
  ];
  for (const triggerQuery of triggerQueries) {
    if (normalizedQuery.includes(triggerQuery)) {
      const territoryName = normalizedQuery.replace(triggerQuery, "").trim();
      const capitalName = territoryToCapital(territoryName);
      if (capitalName) {
        return { territory: territoryName, capital: capitalName };
      } else {
        return;
      }
    }
  }

  return;
};

export { queryToData, Component };
