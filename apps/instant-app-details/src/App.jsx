import apps from "@felvin-search/apps";
import React, { useState, useRef } from "react";
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

//=========================================

// Your UI logic goes here.
// `data` prop is exactly what is returned by queryToData.
function Component({ data }) {

  function getAppById(id) {
    const app = data.filter(app => app.id===id)
    return app[0];
  }

  function copyJSON() {
    navigator.clipboard.writeText(JSON.stringify(data))
  }

  const [currentApp, setCurrentApp] = useState(data[0])
  const inputRef = useRef()
  return (
    <Container>
      <button onClick={copyJSON}>Copy all JSON data to clipboard</button>
      {/* this button is temporary, has served its purpose, not for prod */}
      <select ref={inputRef} onChange={()=>setCurrentApp(getAppById(inputRef.current.value))} value={currentApp.id}>
        {data.map(app => <option value={app.id}>{app.name}</option>)}
      </select>
      <Container>
        <h3>{currentApp.name}</h3>
        <p>{currentApp.description}</p>
        <ul>
          {currentApp.exampleSearchQueries.map(query => <li>
            <a href={"https://felvin.com/search?q="+query}>{query}</a>
          </li>)}
        </ul>
        <img alt="screenshot showing the instant app" src={currentApp.screenshotPath}></img>
      </Container>
    </Container>
  );
}

//=========================================

// This where you can process the query and try to convert it into some meaningful data.
const queryToData = async ({ query }) => {
  if (!isTriggered(query, [ "felvin instant apps" ], { substringMatch: true })) {
    return;
  }

  // You can do any external API call or use any library here
  // to convert the search query into some meaningful data.
  // The data gets passed to the UI Component defined above.

  const data = apps.map(({ id, name, description, screenshotPath, exampleSearchQueries }) => {
    const details = { id, name, description, exampleSearchQueries }
    details.screenshotPath = "https://raw.githubusercontent.com/felvin-search/instant-apps/master/apps/" + id.split('/')[1] + "/src" + screenshotPath.substring(1)
    return details
  })

  return data;
}

export { queryToData, Component };
