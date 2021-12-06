import React from "react";
import styled from "styled-components";
import { isTriggered } from "@felvin-search/core";

//------------Styled Components-------------
// If you're unfamiliar with styled components
// start here https://styled-components.com/docs/basics#getting-started

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 5rem;
  width: 90vw;
  max-width: 585px;
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.25);
  transition: all 0.2s;
  font-size: 1.5rem;
  border-top: 3px solid rgb(0,0,0);
  font-weight: 600;


  border-radius: 8px;
  margin-bottom: 2rem;
`;

//=========================================

// Your UI logic goes here.
// `data` prop is exactly what is returned by queryToData.
function Component({ data }) {
  return <Container>{data}</Container>;
}

//=========================================

// This where you can process the query and try to convert it into some meaningful data.
const queryToData = async ({ query }) => {
  // if (!isTriggered(query, [ "what day" ])) {
  //   return;
  // }

  //filter the query to get the day
  var filteredQuery = query.split(" ");
  filteredQuery = filteredQuery.filter(function (word) {
    return (
      word.toLowerCase() !== "what" &&
      word.toLowerCase() !== "day" &&
      word.toLowerCase() !== "is" &&
      word.toLowerCase() !== "was" &&
      word.toLowerCase() !== "it"
    );
  });

  filteredQuery = filteredQuery[0].split("/");

  // You can do any external API call or use any library here
  // to convert the search query into some meaningful data.
  // The data gets passed to the UI Component defined above.

  const date = new Date(
    filteredQuery[2],
    filteredQuery[1] - 1,
    filteredQuery[0]
  );
  const day = date.getDay();
  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];


  const date_altternate_search = new Date().getDay();

  if (query.toLowerCase().includes("today" && query.toLowerCase().includes("what day"))) {
    return dayNames[date_altternate_search];
  }
  if (query.toLowerCase().includes("tomorrow") && query.toLowerCase().includes("day")) {
    return dayNames[date_altternate_search + 1];
  }
  if (query.toLowerCase().includes("yesterday") && query.toLowerCase().includes("what day")) {
    return dayNames[date_altternate_search - 1];
  }

  const dayName = dayNames[day];

  return dayName;
};

export { queryToData, Component };
