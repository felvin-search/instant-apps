import styled, { keyframes } from "styled-components";

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

function Renderer({ data }) {
  return (
    <div>
      Capital of {data.territory} is <b>{data.capital}</b>
    </div>
  );
}

const queryToTerritory = async ({ query }) => {
  return { territory: "India", capital: "New Delhi" };
};

const CapitalsApp = {
  name: "CapitalsApp",
  description: "Given the name of a territory, I show the name of the capital",
  // queryToData takes in the query and returns data which
  // the Component displays on the website.
  // If queryToData returns no data, we do not display the app.
  queryToData: queryToTerritory,
  Component: Renderer,
};

export default CapitalsApp;
