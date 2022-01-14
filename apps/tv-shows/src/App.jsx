import React from "react";
import styled from "styled-components";
import { Breakpoints } from "@felvin-search/core";
import axios from "axios";

//------------Styled Components-------------
// If you're unfamiliar with styled components
// start here https://styled-components.com/docs/basics#getting-started

const Container = styled.div`
  min-height: 20rem;
  max-width: 80vw;
  display: flex;
  justify-content: center;
  align-items: stretch;
  background-color: #e5dcc3;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.1);
`;

const ImageBox = styled.img`
  height: 25rem;

  @media (max-width: ${Breakpoints.medium}) {
    display: none;
  }
`;

const ImageBoxMobile = styled.img`
  height: 15rem;
  border-radius: 5px;

  @media (min-width: ${Breakpoints.medium}) {
    display: none;
  }
`;

const DetailBox = styled.div`
  min-height: 25rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const TitleText = styled.div`
  font-size: 1.7rem;
  font-weight: bolder;
  width: 30rem;
  text-align: center;
  padding: 1rem 1.5rem;
  background-color: #aaa492;
  max-width: 80vw;
`;

const TopBar = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  color: #444;
  padding: 1rem 1.5rem;
  font-size: 1rem;

  @media (min-width: ${Breakpoints.medium}) {
    font-size: 1.2rem;
  }
`;

const Summary = styled.div`
  font-size: 1rem;
  width: 30rem;
  max-width: 70vw;
`;

//=========================================

// Your UI logic goes here.
// `data` prop is exactly what is returned by queryToData.
function Component({ data }) {
  return (
    <Container>
      <ImageBox src={data.imgURL}></ImageBox>

      <DetailBox>
        <TitleText>{data.name}</TitleText>

        <TopBar>
          <div>{`Rated: ${data.rating}`}</div>
          <div>{data.language}</div>
          <div>{data.genres}</div>
        </TopBar>

        <ImageBoxMobile src={data.imgURL}></ImageBoxMobile>

        <Summary>
          <div dangerouslySetInnerHTML={{ __html: data.summary }}></div>
        </Summary>
      </DetailBox>
    </Container>
  );
}

//=========================================

// This where you can process the query and try to convert it into some meaningful data.
const queryToData = async ({ query }) => {
  // if (!isTriggered(query, [ "tv series" ])) {
  //   return;
  // }

  var filteredQuery = query.split(" ");
  filteredQuery = filteredQuery.filter(
    (word) => word !== "tv" && word !== "show" && word !== "series"
  );
  filteredQuery = filteredQuery.join(" ");

  // You can do any external API call or use any library here
  // to convert the search query into some meaningful data.
  // The data gets passed to the UI Component defined above.
  var response = "";
  try {
    response = await axios.get(
      `https://api.tvmaze.com/search/shows?q=${filteredQuery}`
    );

    // To only render app when query is close to acutal names
    // TODO: something to determine the score empirically rather than hardcode
    if (response.data[0].score <= 0.8) {
      return;
    }
  } catch (err) {
    console.log(err);
    return;
  }

  const showData = {
    name: response.data[0].show.name,
    language: response.data[0].show.language,
    summary: response.data[0].show.summary,
    imgURL: response.data[0].show.image.medium,
    rating: response.data[0].show.rating.average,
    genres: response.data[0].show.genres.join(" | "),
  };

  return showData;
};

export { queryToData, Component };
