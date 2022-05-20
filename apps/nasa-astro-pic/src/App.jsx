import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { isTriggered } from "@felvin-search/core";

//------------Styled Components-------------
// If you're unfamiliar with styled components
// start here https://styled-components.com/docs/basics#getting-started

const Container = styled.div`
  /* display: flex;
  justify-content: center;
  align-items: center; */
  text-align: center;
`;

const Header = styled.header`
  display: flex;
  flex-direction: column;
  text-align: center;
`;

const ImageHeading = styled.div`
  font-weight: 600;
  margin: 20px 0;
`;

const ImageTitle = styled.div`
  font-weight: 400;
  margin-bottom: 16px;
`;

const Image = styled.img`
  border: 1px solid black;
  height: 80vh;
  padding: 3px;
  width: 80vw;
`;

//=========================================

// Your UI logic goes here.
// `data` prop is exactly what is returned by queryToData.
function Component({ data }) {
  const [respData, setRespData] = useState({});
  const [todayDate, setTodayDate] = useState("");

  const nasa_api_key = "icaOTfCrDtdBZU6YCtbC5hPJfMjMfrkr0bowz8nl";
  // const nasa_api_key //TODO -> FIND A WAY TO GET THE API KEY

  const getPOD = async () => {
    const baseUrl = `https://api.nasa.gov/planetary/apod?api_key=${nasa_api_key}`;
    const resp = await fetch(baseUrl);
    const respData = await resp.json();
    setRespData(respData);
  };

  const getDate = () => {
    const newDate = new Date();
    const wordsDate = newDate.toDateString().split(" ");
    const correctFormat = `${wordsDate[2]} ${wordsDate[1]} ${wordsDate[3]}`; /* [2, 1, 3] */
    setTodayDate(correctFormat);
  };

  useEffect(() => {
    getPOD();
    getDate();
  }, []);

  return (
    <Container>
      <Header>
        <ImageHeading>NASA Astronomy Picture for {todayDate}</ImageHeading>
        <ImageTitle>{respData.title}</ImageTitle>
      </Header>

      <div>
        <Image src={respData.hdurl} />
      </div>

      <p>
        Explore the cosmos from the{" "}
        <a href="https://apod.nasa.gov/apod/archivepix.html">
          archived collection!
        </a>
      </p>
    </Container>
  );
}

//=========================================

// This where you can process the query and try to convert it into some meaningful data.
const queryToData = async ({ query }) => {
  if (
    !isTriggered(query, [
      "astronomy picture",
      "apod",
      "nasa pic of the day",
      "nasa image",
    ])
  ) {
    return;
  }

  // You can do any external API call or use any library here
  // to convert the search query into some meaningful data.
  // The data gets passed to the UI Component defined above.

  const data = query.toUpperCase();

  return data;
};

export { queryToData, Component };
