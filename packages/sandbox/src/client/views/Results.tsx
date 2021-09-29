import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import SearchBox from "../components/SearchBox";
import sampleResults from "../data/sample_results.json";
import InstantAppRenderer from "../components/InstantAppsRenderer";
import { Breakpoints } from "@felvin-search/core";

type Result = {
  title: string;
  link: string;
  snippet: string;
};

//--------------Styled Components--------------

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const ResultsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 1rem;

  @media (min-width: ${Breakpoints.medium}) {
    margin: 0;
  }
`;

const ResultContainer = styled.div`
  margin: 0.5rem 0;
  width: 100%;

  @media (min-width: ${Breakpoints.medium}) {
    width: 80ch;
  }
`;

const Title = styled.a`
  text-decoration: none;
  color: ${(props) => props.theme.searchResults.titleColor};

  margin: 0.5rem 0;
  font-size: 1.4rem;
  font-weight: 600;
  line-height: 1.5rem;

  &:visited {
    color: ${(props) => props.theme.searchResults.visitedColor};
  }
`;

const Snippet = styled.div`
  margin: 0.5rem 0;
  font-size: 1rem;
  line-height: 1.15rem;

  color: ${(props) => props.theme.searchResults.snippetColor};
`;

const Link = styled.div`
  font-size: 0.75rem;
  line-height: 1rem;

  color: ${(props) => props.theme.searchResults.linkColor};
`;

//============================================

function Results() {
  const history = useHistory();
  const [results, setResults] = useState<Result[]>([]);
  const q = new URLSearchParams(window.location.search).get("q") || "";

  const [query, setQuery] = useState(q);

  useEffect(() => {
    const fetchResults = async () => {
      const q = new URLSearchParams(window.location.search).get("q") || "";
      document.title = `${q} - Felvin Search` || "Felvin Search";

      if (q.length === 0) {
        // Redirect users to homepage if they directly visit the url without any q
        history.push("/");
      }

      setQuery(q);
      // Renders a sample list of results irrespective of the search query
      setResults(sampleResults.items);
    };

    fetchResults();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window.location.search]);

  return (
    <Container>
      {/* TODO: See if refs are useful and this search box shouldn't be re-rendered. */}
      <SearchBox resultsView />
      <ResultsContainer>
        <InstantAppRenderer key={query} query={query} />
        {results.map((result) => (
          <ResultContainer key={result.link}>
            <Title href={result.link} target="_blank" rel="noopener noreferrer">
              {result.title}
            </Title>
            <Snippet> {result.snippet}</Snippet>
            <Link>{result.link}</Link>
          </ResultContainer>
        ))}
      </ResultsContainer>
    </Container>
  );
}

export default Results;
