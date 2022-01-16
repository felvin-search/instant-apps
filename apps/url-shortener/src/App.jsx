import React, { useState } from "react";
import styled from "styled-components";
import { Breakpoints, isTriggered } from "@felvin-search/core";
import axios from "axios";

//------------Styled Components-------------
// If you're unfamiliar with styled components
// start here https://styled-components.com/docs/basics#getting-started

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const InputBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem 0rem;
  border-radius: 10px;
  overflow: hidden;
`;

const Input = styled.input`
  width: 20rem;
  max-width: 50vw;
  font-size: 1.2rem;
  padding: 1rem 1.5rem;
  background-color: #ecb390; //To be changed later for uniform color scheme
  border: none;
  outline: none;
`;

const SubmitBtn = styled.button`
  padding: 1rem 1.5rem;
  background-color: #df7861; //To be changed later for uniform color scheme
  font-size: 1.2rem;
  margin: 0;
  border: none;
  outline: none;
`;

const OutputBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  margin: 1rem 1.5rem;

  @media (min-width: ${Breakpoints.medium}) {
    flex-direction: row;
  }
`;

const Message = styled.div`
  color: ${(props) => props.color};
  font-weight: bolder;
`;

const DividerPC = styled.div`
  padding: 0 0.5rem;
  @media (max-width: ${Breakpoints.medium}) {
    display: none;
  }
`;

const DividerMob = styled.div`
  padding: 0.5rem 0;
  @media (min-width: ${Breakpoints.medium}) {
    display: none;
  }
`;

const LoaderBox = styled.div`
  width: 5rem;
  height: 5rem;
  display: inline-block;
  overflow: hidden;
  background: none;
`;

const Loader = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  transform: translateZ(0) scale(1);
  backface-visibility: hidden;
  transform-origin: 0 0;

  div {
    position: absolute;
    width: 3rem;
    height: 3rem;
    border: 10px solid #ecb390; //To be changed later for uniform color scheme
    border-top-color: transparent;
    border-radius: 50%;
    animation: loadingKF 1s linear infinite;
    top: 50%;
    left: 50%;
  }

  @keyframes loadingKF {
    0% {
      transform: translate(-50%, -50%) rotate(0deg);
    }
    100% {
      transform: translate(-50%, -50%) rotate(360deg);
    }
  }
`;

//=========================================

// Your UI logic goes here.
// `data` prop is exactly what is returned by queryToData.
function Component({ data }) {
  const [inputUrl, setInputUrl] = useState(data);
  const [outputUrl, setOutputUrl] = useState("");
  const [hasError, setHasError] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

  const shortener = async () => {
    try {
      setShowLoader(true);
      const response = await axios.get(
        `https://api.shrtco.de/v2/shorten?url=${inputUrl}`
      );
      setShowLoader(false);
      setOutputUrl(response.data.result.full_short_link);
      setHasError(false);
    } catch (err) {
      setHasError(true);
      setShowLoader(false);
    }
  };

  var output = null;

  if (outputUrl !== "") {
    if (hasError) output = <Message color="red">Bad Input</Message>;
    else {
      output = (
        <OutputBox>
          <Message color="green">Your Shortened URL is</Message>
          <DividerMob>&darr;</DividerMob>
          <DividerPC>&rarr;</DividerPC>
          <a href={outputUrl} target="_blank">
            {outputUrl}
          </a>
        </OutputBox>
      );
    }
  }

  const loader = (
    <LoaderBox>
      <Loader class="ldio-wh5s68ydb2d">
        <div></div>
      </Loader>
    </LoaderBox>
  );

  return (
    <Container>
      <InputBox>
        <Input
          value={inputUrl}
          onChange={(event) => setInputUrl(event.target.value)}
        ></Input>
        <SubmitBtn onClick={shortener}>Shorten</SubmitBtn>
      </InputBox>
      {showLoader ? loader : null}
      {output}
    </Container>
  );
}

//=========================================

// This where you can process the query and try to convert it into some meaningful data.
const queryToData = ({ query }) => {
  if (
    !isTriggered(query, ["shorten url", "url shortener"], {
      substringMatch: true,
    })
  ) {
    return;
  }

  // You can do any external API call or use any library here
  // to convert the search query into some meaningful data.
  // The data gets passed to the UI Component defined above.

  // this automatically take the url from the query or empty string if not found
  const data = query.split(" ")[2] || " ";
  return data;
};

export { queryToData, Component };
