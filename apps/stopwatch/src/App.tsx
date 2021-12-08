import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { isTriggered } from "@felvin-search/core";

//------------Styled Components-------------
// If you're unfamiliar with styled components
// start here https://styled-components.com/docs/basics#getting-started



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
    <div style={{justifyContent:"center", textAlign:"center",width:"100%"}}>
      
      <h1 >{(Math.floor(currentTime/3600000) === 0)?"":(Math.floor(currentTime/3600000))+"h "}{(Math.floor(currentTime/60000) === 0)&&(Math.floor(currentTime/3600000) === 0)?"":(("0"+(Math.floor(currentTime/60000))%60)).slice(-2)+"m"}{" "+("0"+((Math.floor(currentTime/1000))%60)).slice(-2)}s{" "+("0"+(Math.floor(currentTime/10))%100).slice(-2)}</h1>
        
      <p >
        <button style={{backgroundColor:(running)?"red":"green",color:"white",padding:"10px",margin:"10px",fontSize:"large"}} onClick={startStopButton}>{running?"STOP":"START"}</button>
        <button style={{backgroundColor:"blue",color:"white",padding:"10px",margin:"10px",fontSize:"large"}} onClick={resetButton}>RESET</button>
      </p>
    </div>
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
