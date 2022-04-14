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

const Head = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Body = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 564px) {
    flex-direction: column;
  }
`;

const Element = styled.div`
  padding: 0.8rem;
  margin: 0 auto;
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
  const [name, setName] = useState(values[0].name);
  const handleChange = (e) => {
    setName(e.target.value);
  };
  return (
    <Container>
      <select value={name} onChange={handleChange}>
        {values.map((e) => (
          <option key={e.name} name={e.name}>
            {e.name}
          </option>
        ))}
      </select>

      {values.map((e) => {
        if (e.name === name) {
          return (
            <Head key={e.name}>
              <Body>
                <Element>
                  Name🪙 :<strong>{e.name}</strong>
                </Element>
                <Element>
                  Symbol:<strong>{e.symbol}</strong>
                </Element>
              </Body>
              <Element>Price💰:{e.metrics.market_data.price_usd}USD</Element>
              <Body>
                <Element>
                  24Hr High📈 :{e.metrics.market_data.ohlcv_last_24_hour.high}
                  USD
                </Element>
                <Element>
                  24Hr Low📉 :{e.metrics.market_data.ohlcv_last_24_hour.low}
                  USD
                </Element>
              </Body>
              <Body>
                <Element>
                  24Hr Open :{e.metrics.market_data.ohlcv_last_24_hour.open}
                  USD
                </Element>
                <Element>
                  24Hr Close :{e.metrics.market_data.ohlcv_last_24_hour.close}
                  USD
                </Element>
              </Body>
            </Head>
          );
        }
      })}
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
 // console.log(responseJson)
  return responseJson;
  // You can do any external API call or use any library here
  // to convert the search query into some meaningful data.
  // The data gets passed to the UI Component defined above.
};

export { queryToData, Component };
