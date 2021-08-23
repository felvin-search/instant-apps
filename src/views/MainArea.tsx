import React from "react";
import styled from "styled-components";
import Logo from "../components/Logo";
import SearchBox from "../components/SearchBox";

//-------------Styled Components-------------

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  height: 100%;
`;

const Hero = styled.svg`
  margin: 2rem 0;
`;

//===========================================

function MainArea() {
  return (
    <Container>
      <Hero as={Logo.Icon} />
      <SearchBox />
    </Container>
  );
}

export default MainArea;
