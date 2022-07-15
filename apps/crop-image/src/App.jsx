import React, { useState, useCallback, useRef, useEffect } from "react";
import styled from "styled-components";
import { isTriggered } from "@felvin-search/core";
import { useDropzone } from 'react-dropzone'
import { Upload } from 'react-feather'
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

//------------Styled Components-------------
// If you're unfamiliar with styled components
// start here https://styled-components.com/docs/basics#getting-started
const getColor = (props) => {
  if (props.isDragAccept) {
    return '#00e676';
  }
  if (props.isDragReject) {
    return '#ff1744';
  }
  if (props.isFocused) {
    return '#2196f3';
  }
  return '#eeeeee';
}

const InputFile = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-width: 2px;
  border-radius: 2px;
  border-color: ${props => getColor(props)};
  border-style: dashed;
  background-color: #fafafa;
  color: #bdbdbd;
  outline: none;
  transition: border .24s ease-in-out;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .ReactCrop {
    width: 42%;
  }
`;

const Button = styled.button`
  background: black;
  border-radius: 3px;
  border: none;
  cursor: pointer;
  color: white;
  margin: 1rem 1em;
  font-size: 1rem;
  padding: 0.25em 1em;
`

const Tagline=styled.p`
  color: #bdbdbd;

`
//=========================================

// Your UI logic goes here.
// `data` prop is exactly what is returned by queryToData.

function generateDownload(canvas, crop) {
  if (!crop || !canvas) {
    return;
  }

  canvas.toBlob(
    (blob) => {
      const previewUrl = window.URL.createObjectURL(blob);

      const anchor = document.createElement("a");
      anchor.download = "cropPreview.png";
      anchor.href = URL.createObjectURL(blob);
      anchor.click();

      window.URL.revokeObjectURL(previewUrl);
    },
    "image/png",
    1
  );
}

function Component({ data }) {
  const [upImg, setUpImg] = useState(null);
  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const [crop, setCrop] = useState({ unit: "%" });
  const [completedCrop, setCompletedCrop] = useState(null);

  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
    if (acceptedFiles && acceptedFiles.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () => setUpImg(reader.result));
      reader.readAsDataURL(acceptedFiles[0]);
    }
  }, [])
  const {
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject
  } = useDropzone({ onDrop });



  const onLoad = useCallback((img) => {
    imgRef.current = img;
  }, []);


  useEffect(() => {
    if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
      return;
    }

    const image = imgRef.current;
    const canvas = previewCanvasRef.current;
    const crop = completedCrop;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext("2d");
    const pixelRatio = window.devicePixelRatio;

    canvas.width = crop.width * pixelRatio * scaleX;
    canvas.height = crop.height * pixelRatio * scaleY;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = "high";

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width * scaleX,
      crop.height * scaleY
    );
  }, [completedCrop]);

  return (
    <Container>
      {/* <Input type="file" accept="image/*" onChange={onSelectFile} /> */}
      {!upImg && <InputFile {...getRootProps({ isFocused, isDragAccept, isDragReject })}>
        <input {...getInputProps()} />
        <Upload size={100} />
        <p>Drag n Drop or click to browse</p>
      </InputFile>
      }
      <ReactCrop
        src={upImg}
        onImageLoaded={onLoad}
        crop={crop}
        onChange={(c) => setCrop(c)}
        onComplete={(c) => setCompletedCrop(c)}
      />

      <canvas
        ref={previewCanvasRef}
        style={{
          display: "none",
        }}
      />

      <Button
        type="button"
        onClick={() =>
          generateDownload(previewCanvasRef.current, completedCrop)
        }
        style={
          !completedCrop?.width || !completedCrop?.height
            ? { display: "none" }
            : null
        }
      >
        Download cropped image
      </Button>
      <Tagline>Image cropper</Tagline>
    </Container>
  );
}

//=========================================

// This where you can process the query and try to convert it into some meaningful data.
const queryToData = ({ query }) => {
  if (
    !isTriggered(query, [
      "crop image",
      "crop photo",
      "crop picture",
      "image cropper",
      "photo cropper",
    ])
  ) {
    return;
  }

  // You can do any external API call or use any library here
  // to convert the search query into some meaningful data.
  // The data gets passed to the UI Component defined above.

  const data = query.toUpperCase();

  return data;
};

export { queryToData, Component };
