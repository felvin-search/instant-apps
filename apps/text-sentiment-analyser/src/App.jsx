import React, { useState } from "react";
import styled from "styled-components";
import { isTriggered } from "@felvin-search/core";
import axios from "axios";

//------------Styled Components-------------
// If you're unfamiliar with styled components
// start here https://styled-components.com/docs/basics#getting-started

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 60vw;
  align-items: center;
`;
const Title = styled.div`
  font-size: 2rem;
`;
const BodyText = styled.div`
  color: #80968b;
`;
const Input = styled.textarea`
  width: 15rem;
  height: 10rem;
  font-size: 1rem;
  padding: 2rem;
`;
const Wrapper = styled.div`
  margin-top: 1rem;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  @media (max-width: 1020px) {
    justify-content: center;
  }
`;
const Button = styled.button`
  border: none;
  background: black;
  font-size: 1rem;
  padding: 0.3em 0.6em;
  color: white;
  border-radius: 5px;
  cursor: pointer;
`;
//=========================================

// Your UI logic goes here.
// `data` prop is exactly what is returned by queryToData.
function Component({ data }) {
  const [content, setContent] = useState("");
  const [analysis, setAnalysis] = useState("");
  const fetchAnalysis = async () => {
    if (content.length === 0) {
      alert("First Enter Your Text");
      return;
    }
    const options = {
      method: "POST",
      url: "https://text-analysis12.p.rapidapi.com/sentiment-analysis/api/v1.1",
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Host": "text-analysis12.p.rapidapi.com",
        "X-RapidAPI-Key": "c50084b5aamsh3404a10d64116f3p129a48jsn5be54bb186f4",
      },
      data: `{"language":"english","text":"${content}"}`,
    };
    try {
      setAnalysis(`Analysing content...`);
      const res = await axios.request(options);
      const { data } = res;

      const msg = `Your text sounds ${data.sentiment}. It has ${Math.floor(
        data.aggregate_sentiment.pos * 100
      )}% positivity, and ${Math.floor(
        data.aggregate_sentiment.neg * 100
      )}% negativity. It has a neutral level of ${Math.floor(
        data.aggregate_sentiment.neu * 100
      )}%.`;
      setAnalysis(msg);
    } catch (err) {
      setAnalysis(`Couldn't analyse the content.`);
      console.log(err);
    }
  };
  return (
    <Container>
      <Title>
        Text <span style={{ color: "#DC8B6B" }}>Sentiment</span> Analysis App
      </Title>
      <BodyText>CHECK HOW YOUR TEXT SOUNDS</BodyText>
      <Wrapper>
        <Input
          type="text"
          placeholder="Write/paste any content..."
          onChange={(e) => setContent(e.target.value)}
        />
        <Input
          readOnly
          type="text"
          placeholder="Analysis..."
          value={analysis}
        />
      </Wrapper>
      <Button onClick={fetchAnalysis}>Analyze</Button>
    </Container>
  );
}

//=========================================

// This where you can process the query and try to convert it into some meaningful data.
const queryToData = async ({ query }) => {
  if (!isTriggered(query, ["text sentiment", "mood checker", "sentiment"])) {
    return;
  }

  // You can do any external API call or use any library here
  // to convert the search query into some meaningful data.
  // The data gets passed to the UI Component defined above.

  const data = query.toUpperCase();

  return data;
};

export { queryToData, Component };
