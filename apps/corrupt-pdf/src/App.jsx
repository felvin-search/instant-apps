import React, { useState } from "react";
import styled from "styled-components";
import { isTriggered } from "@felvin-search/core";

//------------Styled Components-------------
// If you're unfamiliar with styled components
// start here https://styled-components.com/docs/basics#getting-started

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  text-align: center;
`;

//=========================================

// Your UI logic goes here.
// `data` prop is exactly what is returned by queryToData.
function Component({ data }) {
  const [pdfFile, setPdfFile] = useState(null);

  /* TODO
   * Find a better way to corrupt files
   * Align and style contents to the center
   * Make this work with other file types
   */
  const corruptPdfDoc = async () => {
    let existingBytes = await fetch(pdfFile);
    const corruptStream = await existingBytes.body.pipeThrough(
      new CompressionStream("gzip")
    );
    return corruptStream;
  };

  //handles file input
  const handleFileInput = (e) => {
    setPdfFile(e.target.files[0]);
  };

  //handles the corrupt onClick
  const handleCorruptClick = async () => {
    const blob = new File([corruptPdfDoc], pdfFile.name, {
      type: "application/gzip",
    });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.style.display = "none";
    link.href = url;
    //filename
    link.download = `Corrupt ${pdfFile.name}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  return (
    <Container>
      <Header>
        <h2> Corrupt PDF</h2>
        <h4>
          {pdfFile === null
            ? "select a pdf file to corrupt"
            : "Corrupt selected file"}
        </h4>
      </Header>

      <div>
        {pdfFile !== null && (
          <>
            <div>{pdfFile.name}</div>
            <button onClick={handleCorruptClick}>Corrupt and download</button>
          </>
        )}
      </div>

      <form>
        <input accept=".pdf" type="file" onChange={handleFileInput} />
      </form>
    </Container>
  );
}

//=========================================

// This where you can process the query and try to convert it into some meaningful data.
const queryToData = async ({ query }) => {
  if (!isTriggered(query, ["corrupt pdf file", "corrupt pdf", "pdf corrupt"])) {
    return;
  }

  // You can do any external API call or use any library here
  // to convert the search query into some meaningful data.
  // The data gets passed to the UI Component defined above.

  const data = query.toUpperCase();

  return data;
};

export { queryToData, Component };
