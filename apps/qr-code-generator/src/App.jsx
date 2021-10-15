import React, { useState, useRef} from "react";
import styled from "styled-components";
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

//=========================================

// Your UI logic goes here.
// `data` prop is exactly what is returned by queryToData.
function Component({ data }) {
  const [url, setUrl] = useState(data);
  const [qrUrl, setQrUrl] = useState(data);
  const inputRef = useRef();
  return (
    <Container>
        <h2>Generate QR Code</h2>
        <Form onSubmit={() => setQrUrl(inputRef.current.value)}>
          <input ref={inputRef} value={url} onChange={() => setUrl(inputRef.current.value)} />
          <button type="submit">Generate!</button>
        </Form>
      <img src={`https://qrtag.net/api/qr_6.png?url=${qrUrl}`} alt={qrUrl} />
    </Container>
  );
}

//=========================================

// This where you can process the query and try to convert it into some meaningful data.
const queryToData = ({ query }) => {
  if (!isTriggered(query, [ "generate QR","make QR","QR for","QR code for" ], {
    substringMatch: true
  })) {
    return Promise.resolve(false);
  }
  const urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
  const url = query.match(urlRegex)?.[0].toString();
  if(url) return Promise.resolve(url);
  return Promise.resolve("https://felvin.com");
}

export { queryToData, Component };
