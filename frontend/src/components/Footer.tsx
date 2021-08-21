import Logo from "./Logo";
import styled from "styled-components";
import Breakpoints from "../shared/Breakpoints";

//-----------Styled Components-------------

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  min-height: 5rem;
  background-color: #f9f9f9;
`;

const Paragraph = styled.p`
  flex: 1;

  font-size: 1rem;
  font-weight: bold;
  margin: 1rem;
  color: #878787;
`;

const List = styled.ul`
  display: none;

  list-style-type: none;
  color: #7c7c7c;
  font-size: 0.75rem;
  padding: 0;
  margin: auto 0 0.5rem 0;

  li + li::before {
    content: "|";
    padding: 0.5rem;
  }

  @media (min-width: ${Breakpoints.medium}) {
    display: flex;
    flex-direction: row;
  }
`;

const Icon = styled.svg`
  flex: 1;
  display: none;

  path {
    fill: #878787;
  }

  @media (min-width: ${Breakpoints.medium}) {
    display: block;
  }
`;

//=========================================

function Footer() {
  return (
    <Container>
      <Paragraph>Make Search your own</Paragraph>

      {/* TODO: Update me to actual links. */}
      <List>
        <li>Privacy Policy</li>
        <li>Terms and Conditions</li>
        <li>Changelogs</li>
        <li>Blog</li>
      </List>

      <Icon as={Logo.Text} />
    </Container>
  );
}

export default Footer;
