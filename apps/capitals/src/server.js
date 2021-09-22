import capitalsData from "../files/capitalsData.json";

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

export default queryToTerritory;
