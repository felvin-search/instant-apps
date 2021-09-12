import styled, { keyframes } from "styled-components";
import { InstantAppProps } from "./types";

//------------Styled Components-------------

const sbinnala = keyframes`
	from {
		transform: rotate(10deg);
	}
	to {
		transform: rotate(80deg);
	}
`;

const rangDe = keyframes`
	0% { fill: rgba(251, 87, 58, 1); }
  50% { fill: rgba(251, 87, 58, 1); }
  51% { fill: rgba(50, 153, 79, 1); }
  100% { fill: rgba(50, 153, 79, 1); }
`;

const Logo = styled.svg`
  animation: ${sbinnala} 1s linear infinite alternate;
  path {
    animation: ${rangDe} 2s linear infinite;
  }
`;

//=========================================

function Renderer(props: InstantAppProps) {
  return <div>{JSON.stringify(props.data)}</div>;
}

const queryToData = async ({ query }: { query: string }) => {
  /**
   * Check if the query has time in it. Expecting the following queries:
   * time in Delhi
   * time India
   * New York time
   * UTC time
   * time at Tokyo
   */
  let processedQuery = query.toLowerCase();

  if (!processedQuery.includes("time")) return;
  // omit "time" from query
  processedQuery = processedQuery.replace("time", "");
  // omit prepositions
  // can't replace "in" without spaces since in could be part
  // of a location
  processedQuery = processedQuery.replace(" in ", "");
  processedQuery = processedQuery.replace(" at ", "");
  const location = processedQuery.trim();

  // Convert location into a timezone

  return { location };
};

const MyApp = {
  name: "time",
  description: "I know time at places.",
  queryToData,
  Component: Renderer,
};

export default MyApp;
