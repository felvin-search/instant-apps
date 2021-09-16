import capitalsData from "./capitalsData.json";

function territoryToCapital(territory) {
  return capitalsData.find(
    (elem) => elem.CountryName.toLowerCase() === territory.toLowerCase()
  )?.CapitalName;
}

//=========================================

function Renderer({ data }) {
  return (
    <div>
      Capital of {data.territory} is <b>{data.capital}</b>
    </div>
  );
}

const queryToTerritory = async ({ query }) => {
  const normalizedQuery = query.toLowerCase();
  // I can use the standard function here probably
  // Need to remove question marks
  // The function should return normalized query without
  // special characters
  const triggers = ["capital of", "what is the capital of"];
  if (normalizedQuery.startsWith("capital of")) {
    const TerritoryName = normalizedQuery.replace("capital of", "").trim();
    const CapitalName = territoryToCapital(TerritoryName);
    if (CapitalName) {
      return { territory: TerritoryName, capital: CapitalName };
    } else {
      return;
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
