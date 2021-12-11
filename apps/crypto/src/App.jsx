import React, { useState } from "react";
import styled from "styled-components";
import { isTriggered } from "@felvin-search/core";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import faker from "faker";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    title: {
      display: true,
    },
  },
};

const labels = [];

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

var cryptos = [
  {
    value: "btc",
    text: "BTC",
  },
  {
    value: "eth",
    text: "ETH",
  },
];

//=========================================

// Your UI logic goes here.
// `data` prop is exactly what is returned by queryToData.
function Component({ data }) {
  let values = data.data;

  const [name, setName] = useState("BTC");
  const handleChange = (e) => {
    setName(e.target.value);
    console.log(e.target.value);
  };

  let priceArray = [];
  let timestampArray = [];

  for (let i = 0; i < values.values.length; i++) {
    priceArray.push(values.values[i][1]);
    let newTime = convertTimestamp(values.values[i][0]);
    timestampArray.push(newTime);
  }

  // Convert timestampt to human readable
  function convertTimestamp(timestamp) {
    let date = new Date(timestamp);
    return date.toLocaleString();
  }

  for (let i = 0; i < values.values.length; i++) {
    labels.push(timestampArray[i]);
  }

  const crypto_data = {
    labels,
    datasets: [
      {
        label: "Price",
        data: priceArray,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <Container>
      <select value={name} onChange={handleChange}>
        <option key={values.name} name={values.name}>
          {values.name}
        </option>
      </select>
      <Head>
        <Body>
          <Element>
            Name :<strong>{values.name}</strong>
          </Element>
          <img src="https://img.icons8.com/color/24/000000/bitcoin--v1.png" />
          <Element>
            Symbol :<strong>{values.symbol}</strong>
            {/* <img src="https://img.icons8.com/color/24/000000/bitcoin--v1.png" /> */}
          </Element>
        </Body>
        <Body>
          <Element>
            Price :
            <h1>
              <strong>${values.values.at(-1)[1].toFixed(2)}</strong>
            </h1>
          </Element>
        </Body>
        <Body>
          <Element>
            <p>{convertTimestamp(values.values.at(-1)[0])}</p>
          </Element>
        </Body>
        <Body>
          <Element>
            High :<strong>{values.values.at(-1)[2].toFixed(2)}</strong>
          </Element>
          <Element>
            Low :<strong>{values.values.at(-1)[3].toFixed(2)}</strong>
          </Element>
        </Body>
      </Head>
      <Line options={options} data={crypto_data} />
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

  // fetchdata(coin);

  const response = await fetch(
    `https://data.messari.io/api/v1/assets/btc/metrics/price/time-series`,
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
