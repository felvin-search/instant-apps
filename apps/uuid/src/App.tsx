import React from "react";
import { v4 as uuidv4 } from "uuid";
import { isTriggered } from "@felvin-search/core";

type Props = {
  data: {
    uuid: string;
  };
};

function Component(props: Props) {
  return (
    <h1>
      <pre>{props.data.uuid}</pre>
    </h1>
  );
}

// @DoNotCacheMe
const queryToData = async ({ query }: { query: string }) => {
  const triggerQueries = ["uuid", "uuidv4"];
  if (!isTriggered(query, triggerQueries, { substringMatch: true })) return;
  return { uuid: uuidv4() };
};

export { queryToData, Component };
