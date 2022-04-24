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
  background-color: #f7e9d7;
  max-width: 55rem;
  border-radius: 10px;
  filter: drop-shadow(0.2rem 0.3rem 0.8rem #ccc);
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

const Company = styled.div`
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
  width: 10rem;
  border-radius: 0 10px 10px 0;
`;

//=========================================

// Your UI logic goes here.
// `data` prop is exactly what is returned by queryToData.
function Component({ data }) {
  return (
    <Container>
      <Metadata>
        <Title>{data.name}</Title>
        <Company>{data.company}</Company>
        <Desc>{data.bio}</Desc>
      </Metadata>
      <Image src={data.avatar_url} alt={data.name} />
    </Container>
  );
}

//=========================================

// This where you can process the query and try to convert it into some meaningful data.
const queryToData = async ({ query }) => {
  if (
    !isTriggered(query.split(" ")[0], ["github"]) ||
    query.split(" ").length < 2
  ) {
    return;
  }

  // You can do any external API call or use any library here
  // to convert the search query into some meaningful data.
  // The data gets passed to the UI Component defined above.

  try {
    const username = query.split(" ")[1];

    const response = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        Accept: "application/json",
        "User-Agent": "Felvin Search (felvin.com)",
      },
    });

    if (!response.ok) {
      return;
    }

    const responseJson = await response.json();

    if (!responseJson?.id) {
      return;
    }

    return responseJson;
  } catch {
    return;
  }
};

export { queryToData, Component };
