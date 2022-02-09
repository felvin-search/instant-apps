import React from "react";
import styled from "styled-components";
import {
  isTriggered,
  InstantApp,
  InstantAppProps,
  queryToDataInput,
  queryToDataOutput,
} from "@felvin-search/core";
import _ from "lodash";

const RowContainer = styled.div`
  display: flex;
  flex-direction: row;

  align-items: center;
`;

const ColContainer = styled.div`
  display: flex;
  flex-direction: column;

  margin: 1rem 0;
`;

const DefinitionContainer = styled.div`
  padding: 0.5rem;
  margin-left: 0.5rem;
`;

const DictionaryContainer = styled.div`
  h1 {
    font-size: 1.5rem;
  }

  audio {
    margin: 0 0.5rem;
  }
`;

function Definition(props) {
  const definition = props.data;
  return (
    <DefinitionContainer>
      <div>{definition.definition}</div>
      {definition.synonyms && (
        <div>
          Synonyms: &thinsp;
          <em>{definition.synonyms.join(", ")}</em>
        </div>
      )}
    </DefinitionContainer>
  );
}

/**
 * The UI logic of the app.
 */
 const columns = [
  { key: 'id', name: 'ID' },
  { key: 'title', name: 'Title' }
];

const rows = [
  { id: 0, title: 'Example' },
  { id: 1, title: 'Demo' }
];
function Component(props: InstantAppProps) {
  const data = props.data;

  return (
    <DictionaryContainer>
      <table>

      <tr>
        <th>User</th>
        <th>Score</th>
      </tr>
      {data && 
        data.map((row, index) => {
          return <tr>
            <td>{row.user}</td>
            <td>{row.score}</td>
            </tr>
        })}

        </table>
    </DictionaryContainer>
  );
}

const ossEvents = [{"ts": 1659420011, "type": "new-instant-app", "score": 5, "user": "hargup"},
{"ts": 1659420011, "type": "bug-report", "score": 1, "user": "hargup"},
    {"ts": 1659420011, "type": "bug-report", "score": 1, "user": "sahil-shubham"},
    {"ts": 1659420011, "type": "improve-instant-app", "score": 1, "user": "orkohunter"}]

const calcTotalScore = (events) => {
  const sum = events.map(e => e.score).reduce((a,b)=>a+b)
  return sum;
}

const eventLogToLeaderboard = (events) => {
  const groupedByUser = _.groupBy(events, "user"); // => Returns an object {'user-id': [grouped events]}
  console.log(groupedByUser)
  var data = []
  for(let user in groupedByUser){
    const leaderboardRow = {user, score: calcTotalScore(groupedByUser[user])}
    // @ts-ignore
    data.push(leaderboardRow);
  }
  
  console.log(data)
  return data;
}

async function queryToData({
  query,
}: queryToDataInput): Promise<queryToDataOutput> {
  // If the query does not contain the following words, do not trigger the app
  // `define`, `meaning`
  if (!isTriggered(query, ["felvin leaderboard", "felvin contributors"], { substringMatch: true })) return;

  return eventLogToLeaderboard(ossEvents);
}

export { queryToData, Component };
