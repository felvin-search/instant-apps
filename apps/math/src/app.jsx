import React from "react";

function Renderer(props) {
  return <h1>{props.data?.result}</h1>;
}

export default Renderer;
