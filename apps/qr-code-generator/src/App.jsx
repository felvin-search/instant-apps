import React, { useState, useRef } from "react";
import styled, { keyframes } from "styled-components";
import { isTriggered } from "@felvin-search/core";

//------------Styled Components-------------
// If you're unfamiliar with styled components
// start here https://styled-components.com/docs/basics#getting-started

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Textarea = styled.textarea`
  resize: none;
`;

const Img = styled.img`
  display: ${(props) => (props.hide ? "none" : "block")};
`;

const RotateInfinitely = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Loader = styled.div`
  box-sizing: border-box;
  height: 200px;
  width: 200px;
  border-radius: 50%;
  border: 10px black solid;
  border-top-color: transparent;
  transform: rotate(0deg);
  animation: ${RotateInfinitely} 700ms ease-in-out infinite;
`;

//=========================================

// Your UI logic goes here.
// `data` prop is exactly what is returned by queryToData.
function Component({ data }) {
  const [content, setContent] = useState(data);
  const [qrContent, setQrContent] = useState(encodeURI(data));
  const [loading, setLoading] = useState(true);
  const inputRef = useRef();
  const submitHandler = (e) => {
    e.preventDefault();
    // if user changes the input, only then set loading to true, as otherwise it causes perpetual loading error
    if (encodeURI(inputRef.current.value) !== qrContent) setLoading(true);
    setQrContent(encodeURI(inputRef.current.value));
  };
  return (
    <Container>
      <h2>Generate QR Code</h2>
      <Form onSubmit={submitHandler}>
        <Textarea
          maxlength="900"
          ref={inputRef}
          onChange={() => setContent(inputRef.current.value)}
        >
          {content}
        </Textarea>
        <button type="submit">Generate!</button>
      </Form>
      {loading ? <Loader /> : null}
      <Img
        hide={loading}
        onLoad={() => setLoading(false)}
        src={`https://api.qrserver.com/v1/create-qr-code/?data=${qrContent}&size=200x200`}
        alt={qrContent}
      />
    </Container>
  );
}

//=========================================

// This where you can process the query and try to convert it into some meaningful data.
const queryToData = ({ query }) => {
  if (
    !isTriggered(
      query,
      ["generate QR", "make QR", "QR for", "QR code for", "encode"],
      {
        substringMatch: true,
      }
    )
  ) {
    return Promise.resolve(false);
  }
  const urlRegex =
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
  const url = query.match(urlRegex)?.[0].toString();
  if (url) return Promise.resolve(url);
  return Promise.resolve("https://felvin.com");
};

export { queryToData, Component };
