import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Breakpoints from "../shared/Breakpoints";
import Button from "../shared/Button";
import Logo from "./Logo";

//------Styled Components--------------

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
`;

const SearchBoxContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;

  width: 100%;
  max-width: 600px;
`;

const SearchIcon = styled.svg`
  position: absolute;
  right: 1.5rem;

  width: 25px;
  height: 25px;
`;

const Input = styled.input`
  width: 100%;
  font-family: inherit;
  font-size: inherit;

  background: ${(props) => props.theme.inputBox.backgroundColor};
  border: 1.5px solid ${(props) => props.theme.inputBox.borderColor};
  border-radius: 23.5px;
  outline: 0;

  padding: 0.5rem 1.5rem;
  margin: 1rem 0.5rem;

  &::placeholder {
    color: ${(props) => props.theme.inputBox.placeholderColor};
  }
`;

const SearchButton = styled(Button)`
  display: none;
  margin: 1.5rem 0;

  @media (min-width: ${Breakpoints.medium}) {
    display: block;
  }
`;
//==================================

type Props = {
  resultsView?: boolean;
};

function SearchBox({ resultsView }: Props) {
  const history = useHistory();

  // SearchBox when rendered on Results page, will already have a query set in the URL.
  const initialQuery =
    new URLSearchParams(window.location.search).get("q") || "";
  const [query, setQuery] = useState(initialQuery);

  const handleChange = (q: string) => {
    setQuery(q);
  };

  const onSubmit = () => {
    // Disable searching empty string, to avoid glitches of re-renders
    if (query === "") {
      return;
    }
    history.push(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <Container>
      <SearchBoxContainer>
        <Input
          // TODO: This should be curated placeholders so that users can try out existing apps.
          placeholder="try 5 minutes timer"
          autoFocus
          value={query}
          onChange={(e) => handleChange(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              onSubmit();
            }
          }}
        />
        <SearchIcon as={Logo.Icon} />
      </SearchBoxContainer>

      {/* Doubt: Should the button be removed on results page using css or conditional rendering? */}
      {!resultsView && <SearchButton onClick={onSubmit}> Search </SearchButton>}
    </Container>
  );
}

export default SearchBox;
