import { InstantApp } from "./types";
import styled from "styled-components";
import { useState } from "react";
import { loremIpsum } from "lorem-ipsum";
import * as Icon from "react-feather";
import Breakpoints from "../shared/Breakpoints";

//-----------Styled Components------------

const Container = styled.div`
  display: flex;
  flex-direction: column;

  margin: 1rem 0 0;
  border: 3px solid #d3dbe4;
  border-radius: 0.25rem;

  @media (min-width: ${Breakpoints.medium}) {
    width: 80ch;
  }
`;

const SettingsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  padding: 1rem;
  border-bottom: 3px solid #d3dbe4;
  background-color: #f4f6f8;
`;

const Input = styled.input`
  width: 2rem;
  margin: 0 1rem 0 0;
  padding: 0.7rem;

  outline: none;
  border: 3px solid #d3dbe4;
  border-radius: 0.375em;
  background-color: #ffffff;
  color: #7b8898;

  text-align: center;
  font-size: 14px;
  line-height: 1.25rem;
  font-weight: 700;

  @media (min-width: ${Breakpoints.medium}) {
    width: 4rem;
  }
`;

const Select = styled.select`
  cursor: pointer;

  width: 9rem;
  margin-right: 1rem;
  padding: 0.875rem 0.7rem 0.75rem;

  outline: none;
  border: 3px solid #d3dbe4;
  border-radius: 0.375rem;

  background-color: #ffffff;
  color: #7b8898;

  font-size: 14px;
  line-height: 1.25rem;
  font-weight: 700;
  font-style: normal;
  text-transform: uppercase;
`;

const Option = styled.option`
  cursor: pointer;
  text-transform: uppercase;
  border-radius: 0.3rem;
  padding: 1rem;
  margin: 0 0.75rem;
`;

const CopyButton = styled.button`
  cursor: pointer;
  color: #fff;
  background-color: #ff6a67;

  border: none;
  border-radius: 0.3rem;
  padding: 0.7rem 0.65rem;
`;

const Output = styled.div`
  max-height: 20rem;
  overflow-y: scroll;
  padding: 1rem 1.5rem;
`;

//========================================

function TextGenerator() {
  const [numCount, setNumCount] = useState("1");
  const [copy, setCopy] = useState(false);
  const [selectedType, setSeletedType] = useState<
    "words" | "sentences" | "paragraphs"
  >("words");

  const handleTypeChange = (typeName: "words" | "sentences" | "paragraphs") => {
    if (selectedType != typeName) {
      setSeletedType(typeName);
    }
  };

  const handleCopy = (clipboard) => {
    var copyText = document.getElementById("lorem-ipsum");

    clipboard.writeText(copyText.innerText).then(() => {
      setCopy(true);

      setTimeout(() => {
        setCopy(false);
      }, 2000);
    });
  };

  return (
    <Container>
      <SettingsContainer>
        <div>
          <Input
            type="number"
            min="1"
            placeholder="1"
            value={numCount}
            onChange={(e) => {
              // This is to ensure that only positive integers are assigned
              e.target.value.match(/[1-9][0-9]*/)
                ? setNumCount(e.target.value.match(/[1-9][0-9]*/)[0])
                : setNumCount("0");
            }}
          />

          <Select defaultValue={selectedType}>
            <Option onClick={() => handleTypeChange("words")}>Words</Option>
            <Option onClick={() => handleTypeChange("sentences")}>
              Sentences
            </Option>
            <Option onClick={() => handleTypeChange("paragraphs")}>
              Paragraph
            </Option>
          </Select>
        </div>

        <CopyButton onClick={() => handleCopy(navigator.clipboard)}>
          {copy ? <Icon.Check /> : <Icon.Clipboard />}
        </CopyButton>
      </SettingsContainer>

      <Output id="lorem-ipsum">
        {/* TODO: The text re-renders on copy button click and timeout */}
        {loremIpsum({
          count: +numCount,
          format: "plain",
          units: selectedType,
        })}
      </Output>
    </Container>
  );
}
const shouldRunMyApp = async ({ query }) => {
  const triggerQueries = ["lorem ipsum generator", "lorem ipsum"];

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
