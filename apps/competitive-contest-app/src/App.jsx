import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { isTriggered } from "@felvin-search/core";
import axios from "axios";
//------------Styled Components-------------
// If you're unfamiliar with styled components
// start here https://styled-components.com/docs/basics#getting-started

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 10rem;
  border: black 4px solid;
`;
const Nabar=styled.div`
  width: 60%;
  

`

//=========================================

// Your UI logic goes here.
// `data` prop is exactly what is returned by queryToData.
function Component({ data }) {
  const [contest,setContest]=useState([]);
  const [codeChef, setCodeChef] = useState([]);
  const [codeforces, setCodeforces] = useState([]);
  const [hackerRank, setHackerRank] = useState([]);
  const fetchdata = async (value) => {
    try {
      const res = await axios.get(`https://kontests.net/api/v1/${value}`);
      setContest(res.data);
      
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchdata("hacker_rank")
      }, []);
 console.log(codeChef);
  return <Container>You searched for: {data}</Container>;
}

//=========================================

// This where you can process the query and try to convert it into some meaningful data.
const queryToData = async ({ query }) => {
  if (!isTriggered(query, ["cp contest"])) {
    return;
  }

  // You can do any external API call or use any library here
  // to convert the search query into some meaningful data.
  // The data gets passed to the UI Component defined above.

  const data = query.toUpperCase();

  return data;
};

export { queryToData, Component };
