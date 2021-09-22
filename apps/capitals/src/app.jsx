import styled from "styled-components";

const Territory = styled.span`
  text-transform: capitalize;
`;

const Capital = styled.span`
  text-transform: capitalize;
  font-weight: bold;
`;

//=========================================

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function Renderer({ data }) {
  return (
    <div>
      Capital of <Territory> {data.territory} </Territory> is{" "}
      <Capital>{data.capital}</Capital>
    </div>
  );
}

export default Renderer;
