import React, { useState } from "react";
import styled from "styled-components";
import { isTriggered } from "@felvin-search/core";

//------------Styled Components-------------
// If you're unfamiliar with styled components
// start here https://styled-components.com/docs/basics#getting-started
const color = "#0cf";

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background: #fafafa;
  width: clamp(250px, 60vw, 700px);
  min-height: 10rem;
  padding: 2rem;
`;
const Navbar = styled.div`
  display: flex;
  width: 90%;
  justify-content: space-between;
`;
const Display = styled.div`
  margin-top: 2rem;
  width: 70%;
  font-size: 5rem;
  font-weight: 900;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const NavItem = styled.div`
  font-weight: 700;
  padding: 5px;
  border-radius: 3px;
  font-size: max(2vw, 12px);
  transition: all 0.3s;
  background: ${(props) => (props.select ? color : "")};
  color: ${(props) => (props.select ? "white" : "")};
  cursor: pointer;
`;
const Button = styled.button`
  display: inline-block;
  padding: 0.75rem 1.25rem;
  border-radius: 10rem;
  border: none;
  cursor: pointer;
  color: #fff;
  text-transform: uppercase;
  font-size: 1rem;
  letter-spacing: 0.15rem;
  transition: all 0.3s;
  position: relative;
  overflow: hidden;
  z-index: 1;
  &:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: ${color};
    border-radius: 10rem;
    z-index: -2;
  }

  &:before {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0%;
    height: 100%;
    background-color: black;
    transition: all 0.3s;
    border-radius: 10rem;
    z-index: -1;
  }
  &:hover {
    color: #fff;
    &:before {
      width: 100%;
    }
  }
`;

//=========================================

// Your UI logic goes here.
// `data` prop is exactly what is returned by queryToData.
function Component({ data }) {
  const [select, setSelect] = useState("pomodoro");
  const [pomodoro, setPomodoro] = useState(1500);
  const [long, setLong] = useState(900);
  const [short, setShort] = useState(300);
  const [isStarted, setIsStarted] = useState(true);
  const format = (time) => {
    return `${new Date(time * 1000).toISOString().substr(14, 5)}`;
  };
  
  const handleTimer = () => {
    setIsStarted(!isStarted)
    const id= setInterval(()=>{
      if(setPomodoro===0 || isStarted===true){
        clearInterval(id)
      }
        setPomodoro(prev=>prev-1)
     },1000)
     
  };

  return (
    <Container>
      <Navbar>
        <NavItem
          select={select === "pomodoro" ? true : false}
          onClick={() => setSelect("pomodoro")}
        >
          Pomodoro
        </NavItem>
        <NavItem
          select={select === "long" ? true : false}
          onClick={() => setSelect("long")}
        >
          Long Break
        </NavItem>
        <NavItem
          select={select === "short" ? true : false}
          onClick={() => setSelect("short")}
        >
          Short Break
        </NavItem>
      </Navbar>
      <Display>
        {/* {select === "pomodoro" ? pomodoro : select === "long" ? long : short} */}
        {format(
          select === "pomodoro" ? pomodoro : select === "long" ? long : short
        )}
      </Display>
      <Button onClick={handleTimer}>{isStarted?'Start':'Pause'}</Button>
    </Container>
  );
}

//=========================================

// This where you can process the query and try to convert it into some meaningful data.
const queryToData = async ({ query }) => {
  if (!isTriggered(query, ["pomodoro timer", "start pomodoro"])) {
    return;
  }

  // You can do any external API call or use any library here
  // to convert the search query into some meaningful data.
  // The data gets passed to the UI Component defined above.

  const data = query.toUpperCase();

  return data;
};

export { queryToData, Component };
