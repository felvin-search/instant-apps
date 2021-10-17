import React, { useState } from "react";
import styled from "styled-components";
import { isTriggered } from "@felvin-search/core";

//------------Styled Components-------------
// If you're unfamiliar with styled components
// start here https://styled-components.com/docs/basics#getting-started

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  * {
    box-sizing: border-box;
  }
`;

const UploadCont = styled.div`
  width: 100%;
  width: 20rem;
  background-color: rgb(255, 255, 255);
  box-shadow: 0 10px 60px rgb(218, 229, 255);
  border: 2px solid rgb(171, 202, 255);
  border-radius: 24px;
  padding: 1.875rem;
  margin: 0.625rem;
  text-align: center;
`;

const UploadZone = styled.div`
  position: relative;
  height: 11.25rem; /* 180px */
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border: 2px dashed rgb(171, 202, 255);
  border-radius: 15px;
  margin-top: 2.1875rem;
  cursor: pointer;
  transition: border-color 300ms ease-in-out;

  &:hover {
    border-color: rgb(63, 134, 255);
    opacity: 0.7;
  }
`;

const Title = styled.h1`
  font-size: 1.8rem;
  font-weight: 500;
  margin-bottom: 0.3125rem;
`;

const Paragraph = styled.p`
  font-size: 0.9375rem;
  color: rgb(196, 195, 196);
  margin-top: 0;
`;

const Image = styled.img`
<<<<<<< HEAD
  display: ${(props) => (props.display ? "block" : "none")};
=======
>>>>>>> added upload image support
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: 0.3125rem;
  border-radius: 10px;
  z-index: 1000;
  transition: opacity 300ms ease-in-out;
`;

<<<<<<< HEAD
const Input = styled.input`
  display: none;
`;

=======
>>>>>>> added upload image support
const Button = styled.input`
  padding: 3px;
`;

const Form = styled.form`
  * {
    margin-bottom: 20px;
  }
`;

const Message = styled.div`
  color: red;
`;

//=========================================

// Your UI logic goes here.
// `data` prop is exactly what is returned by queryToData.
function Component({ data }) {
  const [pth, setPth] = useState("");
  const [file, setFile] = useState("");

  const [link, setLink] = useState("");
  const [msg, setMsg] = useState("");

  function uploadFile(name) {
    document.getElementById(name).click();
  }

  function fileSelected(e) {
    let sfile = e.target.files;
    uploadFileView(sfile[0]);
    setFile(sfile);
  }

  // Upload File Function
  function uploadFileView(fil) {
    // FileReader()
    const fileReader = new FileReader();

    // After File Reader Loaded
    fileReader.addEventListener("load", function () {
      setPth(fileReader.result);
    });

    // Read (file) As Data Url
    fileReader.readAsDataURL(fil);
  }

  const copyToClipboard = (str) => {
    const el = document.createElement("textarea");
    el.value = str;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
  };

  const handleSubmit = () => {
    if (pth === "") {
      setMsg("Please Select a File");

      setTimeout(() => {
        setMsg("");
      }, 3000);
      return null;
    }
    const formData = new FormData();

    formData.append("fileInput", file[0]);
    fetch("https://felvin-upload.herokuapp.com/save", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (response.status !== 200) {
          setMsg("Error While Uploading Files!");
        }
        return response.json();
      })
      .then((responseText) => {
        let src = responseText.url;
        setLink(src);
        setMsg("File is available at " + src);
      })
      .catch((error) => {
        setMsg("File upload error!");
      });
  };

  return (
    <Container>
      <Message>{msg}</Message>
      <UploadCont>
        <div>
          <Title>Upload your file</Title>
          <Paragraph>File should be an Image</Paragraph>
        </div>

        <Form
          encType="multipart/form-data"
          method="post"
          onSubmit={(e) => e.preventDefault()}
        >
          <UploadZone onClick={() => uploadFile("imageUpload")}>
            <Paragraph>Click to browse Image</Paragraph>

            <Image
              src={pth}
              alt="Preview"
              id="previewImage"
              draggable="false"
<<<<<<< HEAD
              display={pth !== ""}
            />

            <Input
=======
              style={pth !== "" ? { display: "block" } : { display: "none" }}
            />

            <input
>>>>>>> added upload image support
              onChange={fileSelected}
              type="file"
              id="imageUpload"
              name="imageUpload"
<<<<<<< HEAD
=======
              style={{ display: "none" }}
>>>>>>> added upload image support
              accept="image/*"
            />
          </UploadZone>

          <div>
            <Button
              type="submit"
              value="Upload"
              onClick={() => handleSubmit()}
            />
            <Button
              type="submit"
              value="Copy Link"
              onClick={() => copyToClipboard(link)}
              disabled={link !== "" ? false : true}
            />
          </div>
        </Form>
      </UploadCont>
    </Container>
  );
}

//=========================================

// This where you can process the query and try to convert it into some meaningful data.
const queryToData = ({ query }) => {
  if (!isTriggered(query, ["upload image", "host an image", "get image url"])) {
    return;
  }

  // You can do any external API call or use any library here
  // to convert the search query into some meaningful data.
  // The data gets passed to the UI Component defined above.

  const data = query.toUpperCase();

  return data;
};

export { queryToData, Component };
