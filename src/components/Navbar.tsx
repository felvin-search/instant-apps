import React from "react";
import Logo from "./Logo";
import styled from "styled-components";
import { GitHub } from "react-feather";

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
  &:after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    width: 7rem;
    height: 7rem;
    transform-origin: 9.5rem 6rem;
    transform: rotate(45deg);
  }
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
