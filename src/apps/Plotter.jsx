import functionPlot from "function-plot";
import { useState } from "react";
import styled from "styled-components";
import { matchTriggerQueries } from "../lib/utilityApis";

//------------Styled Components-------------

const Form = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Input = styled.input`
  margin: 2px;
`;

const H3 = styled.h3`
  color: red;
`;

//=========================================

let contentsBounds = document.body.getBoundingClientRect();
let width = 1000;
let wratio = contentsBounds.width / width;
width *= wratio;
width = width > 800 ? 800 : width; //Large width results in zooming which makes the co-ordinates shift out of element
let height = width / 2.35; //Cinemascope ratio between height and width

function Renderer() {
  const [text, changeText] = useState("x^2");
  const [x_axis, changex] = useState(10);
  const [y_axis, changey] = useState(5);
  const [error, changeError] = useState(null);

  function handleSubmit(e) {
    try {
      e.preventDefault();
      functionPlot({
        target: "#instant_apps_root",
        width,
        height,
        xAxis: { domain: [-x_axis, x_axis] },
        yAxis: { domain: [-y_axis, y_axis] },
        grid: true,
        data: [
          {
            fn: text.trim(),
          },
        ],
      });
      changeError(null);
    } catch (err) {
      changeError("Wrong Input, Please Correct it...");
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <label>
        Enter function
        <Input
          type="text"
          value={text}
          onChange={(e) => changeText(e.target.value)}
        ></Input>
      </label>
      <label>
        X-axis Limits
        <Input
          type="number"
          value={x_axis}
          onChange={(e) => changex(e.target.value)}
        ></Input>
      </label>
      <label>
        Y-axis Limits
        <Input
          type="number"
          value={y_axis}
          onChange={(e) => changey(e.target.value)}
        ></Input>
      </label>
      <Input type="submit" value="Plot It!"></Input>
      {error ? <H3>{error}</H3> : null}
    </Form>
  );
}

const Plotter = {
  name: "Plotter",
  description:
    "This App plots graph of functions that are passed in input. Extremes of x and y axis can be adjusted too",
  queryToData: matchTriggerQueries([
    "plot graph",
    "plotter",
    "graph generator",
    "plot a graph",
    "graph maker",
  ]),
  Component: Renderer,
};

export default Plotter;
