import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { isTriggered } from "@felvin-search/core";
import { PDFDocument } from "pdf-lib"

//------------Styled Components-------------
// If you're unfamiliar with styled components
// start here https://styled-components.com/docs/basics#getting-started

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

//=========================================

// Helper Functions

async function readFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = () => {
      resolve(reader.result);
    }
    reader.onerror = reject;
  })
}

async function merge(files) {
  const pdfDoc = await PDFDocument.create();
  const numDocs = files.length;    
  for(let i = 0; i < numDocs; i++) {
      const donorPdfBytes = await readFile(files[i]);
      const donorPdfDoc = await PDFDocument.load(donorPdfBytes);
      const docLength = donorPdfDoc.getPageCount();
      for(let k = 0; k < docLength; k++) {
          const [donorPage] = await pdfDoc.copyPages(donorPdfDoc, [k]);
          //console.log("Doc " + i+ ", page " + k);
          pdfDoc.addPage(donorPage);
      }
  }
  const pdfDataUri = await pdfDoc.saveAsBase64({ dataUri: true });
  const link = document.createElement("a");
  link.href = pdfDataUri;
  link.download = "merged.pdf";
  link.click();
}

//=========================================

// Your UI logic goes here.
// `data` prop is exactly what is returned by queryToData.
function Component() {
  const inputRef = useRef();
  const [files, setFiles] = useState([]);
  const [canMerge, setCanMerge] = useState(false);
  const [merging, setMerging] = useState(false);
  const bla = () => {
    setFiles(inputRef.current.files);
  } 
  useEffect(() => {
    console.log(files)
    if(files.length>1) setCanMerge(true);
    else setCanMerge(false);
  }, [files])
  const mergeAndDownload = async () => {
    setMerging(true);
    console.log(files);
    await merge(files);
    setMerging(false);
  }
  return (
    <Container>
      <h2>Merge PDFs</h2>
      <label>Input 2 or more PDF files to merge</label>
      <input ref={inputRef} type="file" accept=".pdf" multiple onChange={bla}/>
      {!merging && canMerge ? <button onClick={mergeAndDownload}>Merge</button> : null}
      {merging ? "Merging..." : null}
    </Container>
  );
}

//=========================================

// This where you can process the query and try to convert it into some meaningful data.
const queryToData = ({ query }) => {
  if (!isTriggered(query, [ "merge pdf","combine pdf","merge pdfs","combine pdfs" ], {
    substringMatch: true
  })) {
    return Promise.resolve(false);
  }
  return Promise.resolve(true);
}

export { queryToData, Component };
