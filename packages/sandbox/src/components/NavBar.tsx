import React from "react";
import { GitHub } from "react-feather";
import styled from "styled-components";
import Logo from "./Logo";

//----------Styled Components------------

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  margin: 2rem 1rem 1rem 1rem;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    border-width: 0 5rem 5rem 0;
    border-style: solid;
    border-color: #000 #fff;
    box-shadow: 0 3px 3px rgba(0, 0, 0, 0.3), -1px 3px 3px rgba(0, 0, 0, 0.2);
  }
`;

const Link = styled.a`
  text-decoration: none;
  color: black;
`;

const GitHubIcon = styled.svg`
  cursor: pointer;
  position: relative;
  top: -1rem;
  right: -0.5rem;
`;

const TriangularDiv = styled.div`
  position: absolute;
  top: 0;
  right: 0;

  width: 5rem;
  height: 5rem;
  background-color: transparent;
  clip-path: polygon(0px 0px, 100% 0, 100% 100%);
`;

//======================================

function Navbar() {
  return (
    <Container>
      <Link href="/">
        <Logo.Text />
      </Link>
      <Link
        href="https://github.com/felvin-search/instant-apps"
        target="_blank"
        rel="noreferrer noopener"
      >
        <GitHubIcon as={GitHub} />
        <TriangularDiv></TriangularDiv>
      </Link>
    </Container>
  );
}

export default Navbar;
