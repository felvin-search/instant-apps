import React, { useEffect, useRef, useState } from "react";
import { InstantApp, InstantAppProps, queryToDataInput } from "./types";
import { BlockMath } from 'react-katex';
import styled from "styled-components";
import 'katex/dist/katex.min.css';
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const Container = styled.div`
`;

const InputField = styled.textarea`
    width:100%;
    border:none;
    border-bottom:1px solid black;

    &:focus{
        border:none;
    }
`;

const Alert = styled.div`
`;

const Button = styled.button`
    border: none;
    background: none;
    border: 1px solid black;
    padding: 6px 20px;
    border-radius: 52px;
    cursor:pointer;

    &:active{
        background:black;
        color:white;
    }
`;


const LatexRendererComponent = (props: InstantAppProps) => {
    const [content, setContent] = useState("c = \\pm \\sqrt{a^2 + b^2}")
    const captureInput = (e) => {
        setContent(e.target.value)
    }
    const downloadLatex = (e) => {
        const filename = 'latex-renderer-felvin-search.pdf';
        html2canvas(document.querySelector('#rendererElement'),
            { scale: 5 }
        ).then(canvas => {
            let pdf = new jsPDF();
            pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 10, 215, 29);
            pdf.save(filename);
        });
    }

    return (
        <Container>
            <h2>Enter your latex string below to render 👇</h2>
            <InputField onChange={captureInput} placeholder="c = \pm \sqrt{a^2 + b^2}" />
            <div
                id="rendererElement"
            >
                <BlockMath
                    errorColor={'#cc0000'}
                >{content}</BlockMath>

            </div>
            {content.length > 0 && <Button onClick={downloadLatex} title="This is still experimental">📃 download</Button>}
        </Container>)
};


const parseLatexQuery = async ({ query }: queryToDataInput) => {
    const triggerWord = "latex";
    if (!query.includes(triggerWord)) {
        return;
    }
    return { query }

};

const LatexRenderer: InstantApp = {
    name: "Latex Renderer",
    description: "Enter latex strings to generate output on the fly ",
    queryToData: parseLatexQuery,
    Component: LatexRendererComponent,
};

export default LatexRenderer;
