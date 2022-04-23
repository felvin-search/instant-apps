import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { isTriggered } from "@felvin-search/core";

//------------Styled Components-------------
// If you're unfamiliar with styled components
// start here https://styled-components.com/docs/basics#getting-started

const Container = styled.div`
  display: flex;
  flex-direction: column;
  font-family: Alata;
  text-align: center;
  width: 60vw;
`;

const NewQuoteBtn = styled.button`
  &:hover {
    cursor: pointer;
  }
`;

const ShowDiv = styled.div`
  font-weight: 700;
  text-transform: capitalize;
  letter-spacing: 3px;
  text-decoration: underline;
`;

const QuoteDiv = styled.div`
  text-align: left;
  border-left: 7px solid beige;

  p {
    padding-left: 34px;
  }
`;

//=========================================

// Your UI logic goes here.
// `data` prop is exactly what is returned by queryToData.
function Component({ data }) {
  const [quote, setQuote] = useState({
    /* anime: "Kuroshitsuji",
    character: "Sebastian Michaelis",
    quote:
      "Humans are easily tempted. When they are poised on the edge of hellish despair, and a spider-thin thread of salvation presents itself, they will invariably grasp it. No matter the human.", */
  });

  const getQuote = async () => {
    try {
      const resp = await fetch("https://animechan.vercel.app/api/random");
      const quote = await resp.json();
      setQuote(quote);
    } catch (err) {
      console.error("error fetching anime quotes -> ", err);
    }
  };

  useEffect(() => {
    getQuote();
  }, []);

  return (
    <Container>
      <div>
        <NewQuoteBtn onClick={getQuote}>new quote</NewQuoteBtn>
      </div>
      <ShowDiv>{quote.anime}</ShowDiv>
      <QuoteDiv>
        <p>{quote.quote}</p>
        <p>
          <em>— {quote.character}</em>
        </p>
      </QuoteDiv>
    </Container>
  );
}

//=========================================

// This where you can process the query and try to convert it into some meaningful data.
const queryToData = async ({ query }) => {
  if (!isTriggered(query, ["anime quotes", "anime sayings"])) {
    return;
  }

  // You can do any external API call or use any library here
  // to convert the search query into some meaningful data.
  // The data gets passed to the UI Component defined above.

  const data = query.toUpperCase();

  return data;
};

export { queryToData, Component };
