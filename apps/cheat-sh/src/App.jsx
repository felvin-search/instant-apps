import React from "react";
import styled from "styled-components";
import { isTriggered } from "@felvin-search/core";

//------------Styled Components-------------
// If you're unfamiliar with styled components
// start here https://styled-components.com/docs/basics#getting-started

/*
body {
    background: black;
    color: #bbbbbb;
}
.pre,
pre {
/*    font-family: source_code_proregular; */

/*
font-family: Courier New,Courier,Lucida Sans Typewriter,Lucida Typewriter,monospace;
font-size: 70%;
*/

/*font-family: Lucida Console,Lucida Sans Typewriter,monaco,Bitstream Vera Sans Mono,monospace; */
/*Droid Sans Mono*/
// font-family: "DejaVu Sans Mono", Menlo, "Lucida Sans Typewriter", "Lucida Console", monaco, "Bitstream Vera Sans Mono", monospace;
// /*font-family: bitstream_vera_sans_monoroman;*/
// font-size: 75%;
// }

// input[type="text"]{
//     border: none;
//     background: transparent;
//     color: #bbbbbb;
// }


// */
const Container = styled.div`
  background: black;
  color: #bbbbbb;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  .pre {
    font-family: Courier New,Courier,Lucida Sans Typewriter,Lucida Typewriter,monospace;
    font-size: 70%
  }
`;

//=========================================

// Your UI logic goes here.
// `data` prop is exactly what is returned by queryToData.
function Component({ data }) {
  // console.log(data.keys())
  console.log(data)
  const markup = {"__html": data["html"]}
  return (
    <Container dangerouslySetInnerHTML={markup}>

    </Container>
  );
}

const getSnippet = async (query) => {
  // return "Yolo"
  const response = await fetch(`http://167.172.16.188:8002/${query}`);
  if(response.ok){
    console.log("Got output from cht.sh")

    const data = await response.text()
    return data;
  } else {
    console.log("Didn't get output from cht.sh")
    return;
  }

}

//=========================================

// This where you can process the query and try to convert it into some meaningful data.
const queryToData = async ({ query }) => {
  console.log("Inside Cheat.sh app")
  const html = await getSnippet(query)
  if(!html.includes("Unknown topic")){
    return {html};
  } else {
    return;
  }
}

export { queryToData, Component };
