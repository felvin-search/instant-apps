import React from "react";
import styled from "styled-components";
import { isTriggered } from "@felvin-search/core";

//------------Styled Components-------------
// If you're unfamiliar with styled components
// start here https://styled-components.com/docs/basics#getting-started

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const H3 = styled.h3`
  margin: 0.25rem;
  text-align: center;
`;
  
const H4 = styled.h4`
  margin: 0.25rem;
  text-align: center;
`;

const Grid = styled.div`
  display: grid;
  grid-gap: 0.5rem;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
`;

const Cell = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow-wrap: break-word;
  border: 2px grey dashed;
  padding: 0.25rem;
  `;
  
  const Row = styled.div`
  padding-top: 0.20rem;
  border-top: 2px grey dashed;
  display: flex;
  justify-content: space-between;
`;

//=========================================

// Helper functions

async function fetchData() {
  const url = `https://api.trending-github.com/github/repositories/?period=daily`;
  const res = await (await fetch(url)).json();
  return res.slice(0,8);
}

//=========================================

function RepoDetails(props) {
  const {
    name,
    author,
    url,
    stars,
    forks,
    description
  } = props;
  return (
    <Cell>
      <H3>{author}/<a href={url}>{name}</a></H3>
      <H4>{description}</H4>
      <Row>
        <span>{stars}⭐</span>
        <span>{forks}🍴</span>      
      </Row>
    </Cell>
  );
}

// Your UI logic goes here.
// `data` prop is exactly what is returned by queryToData.
function Component({ data }) {
  return (
    <Container>
      <h2>Trending on GitHub Today...</h2>
      <Grid>
        {data.map(repo => <RepoDetails key={repo.author+repo.name} {...repo}/>)}
      </Grid>
    </Container>
  );
}

//=========================================

// This where you can process the query and try to convert it into some meaningful data.
const queryToData = async ({ query }) => {
  if (!isTriggered(query, [ "trending on github","github trending" ], {
    substringMatch: true
  })) {
    return Promise.resolve(false);
  }
  return await fetchData();
}

export { queryToData, Component };
