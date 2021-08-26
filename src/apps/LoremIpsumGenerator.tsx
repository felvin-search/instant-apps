import { InstantApp } from "./types";
import styled from "styled-components";

//-----------Styled Components------------

const Container = styled.div``;

const Input = styled.input``;

const TabContainer = styled.div``;

const Tab = styled.div``;

const Button = styled.button`
  background-color: #ff6a67;
`;

//========================================

function TextGenerator() {
  return (
    <Container>
      <Input />

      <TabContainer>
        <Tab>Words</Tab>
        <Tab>Sentences</Tab>
        <Tab>Paragraph</Tab>
      </TabContainer>

      <Button>Generate</Button>

      <Button>Copy</Button>
    </Container>
  );
}
const shouldRunMyApp = async ({ query }) => {
  const triggerQueries = ["lorem ipsum generator"];

  for (const triggerQuery of triggerQueries) {
    if (query.toLowerCase() === triggerQuery) {
      return { query };
    }
  }

  return;
};

const LoremIpsumGenerator: InstantApp = {
  name: "Lorem Ipsum Generator",
  description: "Lorem Ipsum Generator",
  queryToData: shouldRunMyApp,
  Component: TextGenerator,
};

export default LoremIpsumGenerator;
