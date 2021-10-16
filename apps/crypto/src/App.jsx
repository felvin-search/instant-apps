import React, { useState } from "react";
import styled from "styled-components";
import { isTriggered } from "@felvin-search/core";

//------------Styled Components-------------
// If you're unfamiliar with styled components
// start here https://styled-components.com/docs/basics#getting-started

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

//=========================================

// Your UI logic goes here.
// `data` prop is exactly what is returned by queryToData.
function Component({ data }) {
  let values = data.data;
  let names = [];
  values.forEach((e) => {
    names.push({ name: e.name });
  });
  const [name, setName] = useState({ value: values[0].name });
  const handleChange = (e) => {
    setName({ value: e.target.value });
  };
  return (
    <Container>
      <div>
        <select value={name.value} onChange={handleChange}>
          {values.map((e) => (
            <option key={e.name} name={e.name}>
              {e.name}
            </option>
          ))}
        </select>
      </div>
    </Container>
  );
}

//=========================================

// This where you can process the query and try to convert it into some meaningful data.
const queryToData = async ({ query }) => {
  if (
    !isTriggered(
      query,
      [
        "crypto",
        "cryptocurrency price",
        "bitcoin price",
        "ethereum price",
        "dogecoin price",
      ],
      { substringMatch: true }
    )
  ) {
    return;
  }

  const response = await fetch(
    "https://data.messari.io/api/v1/assets?fields=id,name,symbol,metrics/market_data/price_usd,metrics/market_data/ohlcv_last_24_hour",
    {
      method: "GET",
      redirect: "follow",
    }
  );
  if (!response.ok) {
    return;
  }

  const responseJson = await response.json();
  return responseJson;
  // You can do any external API call or use any library here
  // to convert the search query into some meaningful data.
  // The data gets passed to the UI Component defined above.
};

export { queryToData, Component };
