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
  background-color: #fcfcfc;
  border: 1.2px solid #eaeaea;
  max-width: 55rem;
  border-radius: 10px;
  cursor: pointer;
`;

const Metadata = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem 1.5rem 0 1.5rem;
`;

const Title = styled.div`
  font-size: 1.7rem;
  font-weight: 600;
  text-transform: uppercase;
  text-align: center;
  margin-down: 0.5rem;
`;

const Author = styled.div`
  font-size: 1.2rem;
  text-align: center;
  color: #333;
`;

const Publisher = styled.div`
  font-size: 1.2rem;
  text-align: center;
  color: #333;
`;

const Desc = styled.div`
  font-size: 1.1rem;
  margin: 1rem 0;
  color: #444;
`;

const Image = styled.img`
  width: 20rem;
  border-radius: 0 10px 10px 0;
`;

const Attribution = styled.div`
  font-size: 0.8rem;
  text-align: center;
  color: #666;
`;

//=========================================

// Your UI logic goes here.
// `data` prop is exactly what is returned by queryToData.
function Component({ data }) {
  return (
    <Container
      onClick={() => window.open(data.volumeInfo.previewLink, "_blank")}
    >
      <Metadata>
        <Title>{data.volumeInfo.title}</Title>
        <Author>Book by {data.volumeInfo.authors.join(", ")}</Author>
        <Publisher>Published by {data.volumeInfo.publisher}</Publisher>
        <Desc>"{data.searchInfo.textSnippet}"</Desc>
        <Attribution>Powered by: Google Books</Attribution>
      </Metadata>
      <Image
        src={data.volumeInfo.imageLinks.thumbnail}
        alt={data.volumeInfo.title}
      />
    </Container>
  );
}

//=========================================

// This where you can process the query and try to convert it into some meaningful data.
const queryToData = async ({ query }) => {
  if (
    !isTriggered(query.split(" ")[0], ["isbn", "book"]) ||
    query.split(" ").length < 2
  ) {
    return;
  }

  // You can do any external API call or use any library here
  // to convert the search query into some meaningful data.
  // The data gets passed to the UI Component defined above.

  try {
    const isbn = parseInt(query.split(" ")[1]);

    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`,
      {
        headers: {
          Accept: "application/json",
          "User-Agent": "Felvin Search (felvin.com)",
        },
      }
    );

    if (!response.ok) {
      return;
    }

    const responseJson = await response.json();

    if (responseJson?.totalItems == 0) {
      return;
    }

    const data = responseJson.items[0];
    return data;
  } catch {
    return;
  }
};

export { queryToData, Component };
