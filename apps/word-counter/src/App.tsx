import React, { useState } from "react";
import styled from "styled-components";
import { matchTriggerQueries } from "@felvin-search/core";

//------------Styled Components-------------

const TextArea = styled.textarea`
  border: 1px solid #d0d0d0;
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
`;

//=========================================

function Component() {
  const [text, setText] = useState("");
  return (
    <div>
      <div>Character count: {text.length}</div>
      <div>Word count: {text.match(/[\w-]+/gm)?.length || 0}</div>
      <TextArea
        rows={5}
        placeholder="Write here"
        onChange={(e) => setText(e.target.value)}
      />
    </div>
  );
}

const queryToData = matchTriggerQueries([
  "word counter",
  "character count",
  "word count",
  "letter count",
  "count words",
]);

export { Component, queryToData };
