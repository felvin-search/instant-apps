import React from "react";
import Logo from "./Logo";
import styled from "styled-components";

//----------Styled Components------------

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  margin: 2rem 1rem 1rem 1rem;
`;

const Link = styled.a`
  text-decoration: none;
`;

//======================================

function Navbar() {
  return (
    <Container>
      <Link href="/">
        <Logo.Text />
      </Link>
    </Container>
  );
}

export default Navbar;
