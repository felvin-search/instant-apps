import { useEffect, useRef } from "react";
import Tetris from "react-tetris";
import styled from "styled-components";
import { matchTriggerQueries } from "../lib/utilityApis";

const Wrapper = styled.section`
  .game-block {
    margin: 0;
    padding: 0;
    width: 1.5em;
    height: 1.5em;
    border: 1px solid #ddd;
  }
  .piece-i {
    background-color: #ec858b;
  }
  .piece-j {
    background-color: #f1b598;
  }
  .piece-l {
    background-color: #f8efae;
  }
  .piece-o {
    background-color: #b5a677;
  }
  .piece-s {
    background-color: #816e56;
  }
  .piece-t {
    background-color: #b77c72;
  }
  .piece-z {
    background-color: #e3be58;
  }
  .piece-preview {
    background-color: #eee;
  }
`;

const StyledContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  padding: 10px;
`;

const StyledItem = styled.div`
  border: 1px solid #ccc;
  padding: 10px;
  font-size: 1rem;
  text-align: center;
`;
const StyledHidden = styled.div`
  position: absolute;
  height: 100px;
  width: 100px;
  right: -1000px;
  top: 50px;
`;
const StyledHiddenOuter = styled.div`
  overflow: hidden;
  position: relative;
`;

function Renderer() {
  const useFocus = () => {
    const mainRef = useRef(null);
    const setFocus = (condition = true) => {
      if (condition) {
        return mainRef.current && mainRef.current.focus();
      } else {
        return mainRef.current && mainRef.current.blur();
      }
    };
    return [mainRef, setFocus];
  };
  const [mainRef, setMainRef] = useFocus();

  useEffect(() => {
    setMainRef();
    setMainRef(false);
  }, []);

  //code to prevent scrolling behaviour on spacebar and arrow key press
  window.addEventListener("keydown", function (e) {
    if (e.code === "Space" && e.target === document.body) {
      e.preventDefault();
    }
    if (e.code === "ArrowUp" && e.target === document.body) {
      e.preventDefault();
    }
    if (e.code === "ArrowDown" && e.target === document.body) {
      e.preventDefault();
    }
  });

  return (
    <>
      <StyledHiddenOuter>
        {/* style to prevent overflow */}
        <StyledHidden>
          {/* style to move text field outside screen */}
          {/* hidden input text field to divert focus off search box */}
          <input type="text" ref={mainRef} tabindex="-1" />
        </StyledHidden>
      </StyledHiddenOuter>

      <Wrapper>
        <Tetris>
          {({ Gameboard, PieceQueue, points, linesCleared }) => {
            // Render it however you'd like
            return (
              <StyledContainer>
                <StyledItem>
                  <p>Score:</p>
                  <p> {points}</p>
                  <p>Lines Cleared: </p>
                  <p>{linesCleared}</p>
                </StyledItem>

                <StyledItem>
                  <Gameboard />
                </StyledItem>

                <StyledItem>
                  <PieceQueue />
                </StyledItem>
              </StyledContainer>
            );
          }}
        </Tetris>
      </Wrapper>
    </>
  );
}

const MyApp = {
  name: "Tetris-game",
  description: "Play tetris game",
  queryToData: matchTriggerQueries([
    "tetris",
    "play tetris",
    "play tetris game",
  ]),
  Component: Renderer,
};

export default MyApp;
