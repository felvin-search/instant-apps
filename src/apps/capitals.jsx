import styled from "styled-components";
import capitalsData from "./capitalsData.json";

const Territory = styled.div`
  text-transform: capitalize;
`;

const Capital = styled.div`
  text-transform: capitalize;
  font-weight: bold;
`;

//=========================================

function Renderer({ data }) {
  return (
    <div>
      Capital of <Territory>{data.territory}</Territory> is{" "}
      <Capital>{data.capital}</Capital>
    </div>
  );
}

function territoryToCapital(territory) {
  return capitalsData.find(
    (elem) => elem.CountryName.toLowerCase() === territory.toLowerCase()
  )?.CapitalName;
}

const queryToTerritory = async ({ query }) => {
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
    if (normalizedQuery.startsWith(triggerQuery)) {
      const TerritoryName = normalizedQuery.replace(triggerQuery, "").trim();
      const CapitalName = territoryToCapital(TerritoryName);
      if (CapitalName) {
        return { territory: TerritoryName, capital: CapitalName };
      } else {
        return;
      }
    }
  }

  return;
};

const CapitalsApp = {
  name: "CapitalsApp",
  description: "Given the name of a territory, I show the name of the capital",
  queryToData: queryToTerritory,
  Component: Renderer,
};

export default CapitalsApp;
