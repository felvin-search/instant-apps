import styled from "styled-components";
import capitalsData from "./capitalsData.json";

const Territory = styled.span`
  text-transform: capitalize;
`;

const Capital = styled.span`
  text-transform: capitalize;
  font-weight: bold;
`;

//=========================================

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function Renderer({ data }) {
  return (
    <div>
      Capital of <Territory> {data.territory} </Territory> is{" "}
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

const CapitalsApp = {
  name: "CapitalsApp",
  description: "Given the name of a territory, I show the name of the capital",
  queryToData: queryToTerritory,
  Component: Renderer,
};

export default CapitalsApp;
