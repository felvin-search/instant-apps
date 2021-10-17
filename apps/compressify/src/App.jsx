import React, { useState } from "react";
import styled from "styled-components";
import { isTriggered, Breakpoints } from "@felvin-search/core";
import Compressor from "compressorjs";

//------------Styled Components-------------
// If you're unfamiliar with styled components
// start here https://styled-components.com/docs/basics#getting-started

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 60vw;
`;

const Element = styled.div`
  display: flex;
  padding: 0.5rem;
  box-sizing: border-box;
  flex-direction: row;
`;
const Compressed = styled.img`
  height: 20rem;
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border-radius: 20px;
`;

const Content = styled.div`
  padding: 0.5rem;
  justify-content: center;
  align-content: center;
  box-sizing: border-box;
`;

const SpaceSaved = styled.div`
  color: green;
`;

//=========================================

// Your UI logic goes here.
// `data` prop is exactly what is returned by queryToData.
function Component({ data }) {
  const [compressedFile, setCompressedFile] = useState(null);
  const [imageSize, setImageSize] = useState(null);
  const [fileName, setFileName] = useState("");

  const handleCompressedUpload = (e) => {
    const image = e.target.files[0];
    let name = image.name;
    name = "compressed_" + name;
    setFileName(name);
    new Compressor(image, {
      quality: 0.7,
      success: (result) => {
        let spaceSaved = ((image.size - result.size) * 100) / image.size;
        setImageSize({ saved: spaceSaved, newSize: result.size / 1024 });
        setCompressedFile(URL.createObjectURL(result));
      },
    });
  };

  return (
    <Container>
      <input
        accept="image/*,capture=camera"
        capture="camera"
        type="file"
        onChange={(event) => handleCompressedUpload(event)}
      />
      {compressedFile != null ? (
        <Element>
          <Compressed src={compressedFile} />
          <Content>
            <a href={compressedFile} download={fileName}>
              <button>Click to download</button>
            </a>
            {imageSize.saved > 0 ? (
              <div>
                <SpaceSaved>
                  {imageSize.saved.toFixed(2)}% Space saved
                </SpaceSaved>
                <SpaceSaved>
                  Compressed size: {imageSize.newSize.toFixed(2)}Kb
                </SpaceSaved>
              </div>
            ) : (
              <div>No Saving in this Image😔</div>
            )}
          </Content>
        </Element>
      ) : null}
    </Container>
  );
}

//=========================================

// This where you can process the query and try to convert it into some meaningful data.
const queryToData = ({ query }) => {
  if (!isTriggered(query, ["compress image", "image compressor"])) {
    return;
  }

  // You can do any external API call or use any library here
  // to convert the search query into some meaningful data.
  // The data gets passed to the UI Component defined above.

  const data = query.toUpperCase();

  return data;
};

export { queryToData, Component };
