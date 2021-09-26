import React, { useState } from "react";
import { hydrate } from "react-dom";
import styled from "styled-components";

const mountNode = document.getElementById("root");

const Input = styled.input``;

export const HomePage = function () {
  const [query, setQuery] = useState("");

  return (
    <Input
      autoFocus
      onChange={(e) => {
        setQuery(q);
      }}
      onKeyPress={(e) => {
        if (e.key === "Enter") {
          console.log("hey");
          window.location = `/search?q=${encodeURIComponent(query)}`;
        }
      }}
    />
  );
};

const Renderer = function () {
  return <></>;
};

export const SearchPage = function () {
  const [query, setQuery] = useState("");

  return (
    <>
      <Input
        autoFocus
        onChange={(e) => {
          setQuery(q);
        }}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            console.log("hey");
            window.location = `/search?q=${encodeURIComponent(query)}`;
          }
        }}
      />
      <Renderer />
    </>
  );
};

hydrate(<HomePage />, mountNode);
