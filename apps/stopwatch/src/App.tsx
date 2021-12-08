import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { isTriggered } from "@felvin-search/core";

//------------Styled Components-------------
// If you're unfamiliar with styled components
// start here https://styled-components.com/docs/basics#getting-started
const Button = styled.button`
  color: white;
  cursor:pointer;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  background: blue;
`;

const Container = styled.div`;
  align-self : center;
  text-align : center;
  width : 100%;
`;




//=========================================

// Your UI logic goes here.
// `data` prop is exactly what is returned by queryToData.
function Component({ data }) {

  const [currentTime,setCurrentTime] = useState(0);
  const [running,setRunning] = useState(false);
  const [reset,setReset] = useState(false);
  
  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => {
        setCurrentTime((prevTime) => prevTime + 10);
      }, 10);
    } 
    else if(reset){
      clearInterval(interval);
      setReset(false);
      setRunning(false);
    }
    return () => clearInterval(interval);
  }, [running]);

  const startStopButton = ()=>{
    if(!running){
      setRunning(true);
    }
    else{
      setRunning(false);
    }
  }

  const resetButton = ()=>{
    if(running){
      setRunning(false);
      setCurrentTime(0);
    }
    else{
      setCurrentTime(0);
    }
  }

  return (
    <Container>
      
      <h1 >{(Math.floor(currentTime/3600000) === 0)?"":(Math.floor(currentTime/3600000))+"h "}{(Math.floor(currentTime/60000) === 0)&&(Math.floor(currentTime/3600000) === 0)?"":(("0"+(Math.floor(currentTime/60000))%60)).slice(-2)+"m"}{" "+("0"+((Math.floor(currentTime/1000))%60)).slice(-2)}s{" "+("0"+(Math.floor(currentTime/10))%100).slice(-2)}</h1>
        
      <p >
        <Button onClick={startStopButton}>{running?"STOP":"START"}</Button>
        <Button onClick={resetButton}>RESET</Button>
      </p>
    </Container>
  );
}

//=========================================

// This where you can process the query and try to convert it into some meaningful data.
const queryToData = async ({ query }) => {
  if (!isTriggered(query, [ "stopwatch" ])) {
    return;
  }

  // You can do any external API call or use any library here
  // to convert the search query into some meaningful data.
  // The data gets passed to the UI Component defined above.

  const data = query.toUpperCase();

  return data;
}

export { queryToData, Component };
