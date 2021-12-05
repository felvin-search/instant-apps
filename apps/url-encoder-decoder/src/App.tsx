import React,{useState} from "react";
import styled from "styled-components";
import { isTriggered } from "@felvin-search/core";

//------------Styled Components-------------
// If you're unfamiliar with styled components
// start here https://styled-components.com/docs/basics#getting-started

const Button_enc = styled.button`
  background: red;
  width: 24%;
  margin: 10px 5% 0 5%;
  color: white;
`;

const Button_dec = styled.button`
  background: green;
  width: 24%;
  margin: 10px 5% 0 4%;
  color: white;
`;

const Button_copy = styled.button`
  background: blue;
  width: 24%;
  margin: 10px 5% 0 4%;
  color: white;
`;

//=========================================

// Your UI logic goes here.
// `data` prop is exactly what is returned by queryToData.
function Component({ data }) {
  const [url, seturl] = useState('');

  const onChangeHandler = async (event) =>{
    await seturl(event.target.value);
  }

  const handleEncode = async () => {
    await seturl(encodeURIComponent(url));
  }

  const handleDecode = async () =>{
    await seturl(decodeURIComponent(url));
  }

  const handleCopy = async (event) =>{
    await navigator.clipboard.writeText(url).then(function() {
      event.target.innerHTML = 'Copied';
      setTimeout(()=>{
        event.target.innerHTML = 'Copy';
      }, 1000);
    }, function(err) {
      // console.error('Async: Could not copy url: ', err);
    });
  }

  return (
    <div>
      <div>
        <input type="text" style={{"width":"100%"}} placeholder="Enter url here..." id="url-text-box" value={url} onChange={onChangeHandler}/>  
        <Button_enc onClick={handleEncode}>Encode</Button_enc>
        <Button_copy onClick={handleCopy} id="copy-button">Copy</Button_copy>
        <Button_dec onClick={handleDecode}>Decode</Button_dec>
      </div>
    </div>
  );
}

//=========================================

// This where you can process the query and try to convert it into some meaningful data.
const queryToData = async ({ query }) => {
  if (!isTriggered(query, [ "url encoder and decoder", "url decoder","url encoder","url encoder decoder","encoding url","decoding url","encoding and decoding url" ])) {
    return;
  }

  // You can do any external API call or use any library here
  // to convert the search query into some meaningful data.
  // The data gets passed to the UI Component defined above.

  const data = query.toUpperCase();

  return data;
}

export { queryToData, Component };
