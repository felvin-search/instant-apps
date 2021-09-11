import styled, { keyframes } from "styled-components";
import { matchTriggerQueries } from "../lib/utilityApis";

//------------Styled Components-------------

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;

  height: 120px;
  margin: 2rem 0;
  padding: 1rem;
`;

const bounce = keyframes`
  0%{
    transform: translateY(0px);
  }

  100% {
    transform: translateY(-80px)
  }
`;

const Circle = styled.div`
  position: relative;

  width: 75px;
  height: 75px;
  border-radius: 50%;
  background-color: rgb(95, 38, 255);

  animation: ${bounce} 500ms alternate infinite cubic-bezier(0.2, 0.65, 0.6, 1);
`;

const shilloute = keyframes`
  0%{
    width: 75px;
    height: 2px;
  }

  100%{
    width: 55px;
    height: 5px;
    filter: blur(0.5px)
  }
`;

const Shadow = styled.div`
  border-radius: 50%;
  background-color: #333;

  animation: ${shilloute} 500ms alternate infinite
    cubic-bezier(0.2, 0.65, 0.6, 1);
`;

//=========================================

function Renderer() {
  return (
    <Container>
      <Circle></Circle>
      <Shadow></Shadow>
    </Container>
  );
}

const BouncyBall = {
  name: "Bouncy ball",
  description: "It's just a bouncy ball",
  queryToData: matchTriggerQueries([
    "bouncy ball",
    "ball bouncing",
    "ball bounce",
    "bouncing ball",
  ]),
  Component: Renderer,
};

export default BouncyBall;
