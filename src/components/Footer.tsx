import Logo from "./Logo";
import styled from "styled-components";
import Breakpoints from "../shared/Breakpoints";

//-----------Styled Components-------------

const Container = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;

  min-height: 5.5rem;
  background-color: #f9f9f9;
`;

const List = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: center;

  width: 100%;
  list-style-type: none;

  background-color: #252525;
  color: #7c7c7c;

  font-size: 0.75rem;
  padding: 0.3rem;
  margin: auto 0 0rem 0;

  li + li::before {
    content: "|";
    padding: 0 0.5rem;
  }
`;

const Icon = styled.svg`
  display: block;
  position: absolute;
  right: 2rem;
  bottom: 2.5rem;

  path {
    fill: #878787;
  }
`;

const Link = styled.a`
  text-decoration: none;
  color: inherit;
`;

//=========================================

function Footer() {
  return (
    <Container>
      <List>
        <li>
          <Link
            href="https://neera.ai/policy"
            target="_blank"
            rel="noreferrer noopener"
          >
            Privacy Policy
          </Link>
        </li>
        {/* <li>Terms and Conditions</li> */}
        <li>
          <Link
            href="https://blog.neera.ai/"
            target="_blank"
            rel="noreferrer noopener"
          >
            Changelogs
          </Link>
        </li>
        <li>
          <Link
            href="https://hargup.substack.com/people/13382843-harsh-gupta"
            target="_blank"
            rel="noreferrer noopener"
          >
            Blog
          </Link>
        </li>
      </List>

      <Icon as={Logo.Text} />
    </Container>
  );
}

export default Footer;
