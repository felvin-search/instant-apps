import html2pdf from "html-to-pdf-js";
import "katex/dist/katex.min.css";
import { useState } from "react";
import { BlockMath } from "react-katex";
import styled from "styled-components";
import { matchTriggerQueries } from "../lib/utilityApis";
import { InstantApp, InstantAppProps } from "./types";

const Container = styled.div`
  // width: 100%;
  width: 500px;
  min-height: 300px;
  // margin:20px 0;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  @media only screen and (max-width: 900px) {
    width: 100%;
  }
`;

const InputField = styled.textarea`
  width: 100%;
  border: none;
  border-bottom: 1px solid black;

  &:focus {
    border: none;
  }
`;

const Button = styled.button`
  border: none;
  background: none;
  border: 1px solid black;
  padding: 6px 20px;
  border-radius: 52px;
  cursor: pointer;

  &:active {
    background: black;
    color: white;
  }
`;
const ErrorButton = styled.button`
  border: none;
  background: none;
  border: 1px solid red;
  padding: 6px 20px;
  border-radius: 52px;
  cursor: pointer;
  margin: 20px 0;

  &:active {
    background: red;
    color: white;
  }
`;

const ErrorHandler = (props) => {
  const [showError, setShowError] = useState(true);
  return (
    <>
      <ErrorButton
        onClick={() => {
          setShowError(!showError);
        }}
      >
        {showError ? `Hide` : `Show`} error
      </ErrorButton>
      {showError && <p style={{ fontSize: "1rem" }}>{props.error.message}</p>}
    </>
  );
};

const LatexRendererComponent = (props: InstantAppProps) => {
  const [content, setContent] = useState("c = \\pm \\sqrt{a^2 + b^2}");
  const captureInput = (e) => {
    setContent(e.target.value);
  };
  const downloadLatex = (e) => {
    const filename = "latex-renderer-felvin-search.pdf";
    var element = document.getElementById("rendererElement");
    var opt = {
      margin: 1,
      filename: filename,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    // New Promise-based usage:
    html2pdf().set(opt).from(element).save();
  };

  return (
    <div style={{ margin: "20px 0px" }}>
      <Container>
        <h2>Enter LaTeX below 👇</h2>
        <InputField
          onChange={captureInput}
          placeholder="c = \pm \sqrt{a^2 + b^2}"
        />
        <div id="rendererElement">
          <BlockMath
            errorColor={"#cc0000"}
            renderError={(error) => {
              return <ErrorHandler error={error} />;
            }}
          >
            {content}
          </BlockMath>
        </div>
      </Container>
      {content.length > 0 && (
        <Button onClick={downloadLatex} title="This is still experimental">
          📃 download
        </Button>
      )}
    </div>
  );
};

const LatexRenderer: InstantApp = {
  queryToData: matchTriggerQueries(["latex"], { substringMatch: true }),
  Component: LatexRendererComponent,
};

export default LatexRenderer;
