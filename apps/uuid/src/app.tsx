import React from "react";

type Props = {
  data: {
    uuid: string;
  };
};

function Renderer(props: Props) {
  return (
    <h1>
      <pre>{props.data.uuid}</pre>
    </h1>
  );
}

export default Renderer;
