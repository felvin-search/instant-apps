import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { isTriggered } from "@felvin-search/core";
import axios from "axios";

//------------Styled Components-------------
// If you're unfamiliar with styled components
// start here https://styled-components.com/docs/basics#getting-started

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background: #f1f1f1;
  justify-content: center;
  width: 500px;
  padding: 10px;
  border-radius: 10px;
`;
const Form = styled.form`
  width: 100%;
  text-align: center;
`;
const Input = styled.input`
  border: 0;
  outline: 0;
  padding: 1em;
  -moz-border-radius: 8px;
  -webkit-border-radius: 8px;
  border-radius: 8px;
  margin-top: 1em;
  width: 100%;
  display: block;
  font-family: "Merriweather", sans-serif;
  -moz-box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
  -webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
  //resize: none;

  & :focus {
    -moz-box-shadow: 0 0px 2px #e74c3c !important;
    -webkit-box-shadow: 0 0px 2px #e74c3c !important;
    box-shadow: 0 0px 2px #e74c3c !important;
  }
`;
const TextArea = styled.textarea`
  border: 0;
  outline: 0;
  height: 200px;
  padding: 1em;
  -moz-border-radius: 8px;
  -webkit-border-radius: 8px;
  border-radius: 8px;
  width: 100%;
  margin-top: 1em;
  font-family: "Merriweather", sans-serif;
  -moz-box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
  -webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
  resize: none;
  & :focus {
    -moz-box-shadow: 0 0px 2px #e74c3c !important;
    -webkit-box-shadow: 0 0px 2px #e74c3c !important;
    box-shadow: 0 0px 2px #e74c3c !important;
  }
`;
const Div = styled.div`
  display: flex;
  justify-content: center;
  gap: 3rem;
  width: 100%;
`;
const Heading = styled.p`
  text-align: center;
`;

//=========================================

// Your UI logic goes here.
// `data` prop is exactly what is returned by queryToData.
function Component({ data: db }) {
  const [data, setData] = useState({
    name: "",
    mailto: "",
    subject: "",
    body: "",
  });
  const [contact, setContact] = useState([]);
  const [detail, setDetail] = useState({
    name: "",
    mailto: "",
  });
  const findMatch = () => {
    contact.map((el) => {
      if (el.name == db.name) {
        setData({
          name: db.name,
          mailto: el.mailto,
        });
      }
    });
  };

  const handleOnChange = (e) => {
    setData((pre) => {
      return {
        ...pre,
        [e.target.name]: e.target.value,
      };
    });
  };
  const handleChange = (e) => {
    setDetail((pre) => {
      return {
        ...pre,
        [e.target.name]: e.target.value,
      };
    });
  };
  useEffect(() => {
    let db = JSON.parse(localStorage.getItem("contact") || []);
    setContact(db);
  }, []);
  useEffect(() => {
    localStorage.setItem("contact", JSON.stringify(contact));
    findMatch();
  }, [contact]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `https://felvin-mailer.fly.dev/sendmail?to=${data.mailto}&sub=${data.subject}&text=${data.body}`
      );

      if (res.status === 200) {
        alert("Mail sent successfully");
        setData((pre) => {
          return {
            ...pre,
            subject: "",
            body: "",
          };
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleSave = (e) => {
    e.preventDefault();
    setContact((pre) => [...pre, detail]);
    setDetail({
      name: "",
      mailto: "",
    });
  };
  return (
    <>
      {db.config ? (
        <Container>
          <Heading>Save Your Contacts</Heading>
          <Form onSubmit={handleSave}>
            <Div>
              <Input
                type="text"
                value={detail.name}
                name="name"
                placeholder="Name"
                onChange={handleChange}
              />
              <Input
                type="email"
                value={detail.mailto}
                name="mailto"
                placeholder="Email address"
                onChange={handleChange}
              />
            </Div>
            <Input
              type="submit"
              value="Save"
              style={{
                color: "white",
                background: "#e74c3c",
                cursor: "pointer",
                width: "100%",
              }}
            />
          </Form>
        </Container>
      ) : (
        <Container>
          <Heading>Send Email To Your Contact</Heading>
          <Form onSubmit={handleSubmit}>
            <Div>
              <div>
                <Input type="text" value={data.name} placeholder="Name" />
                <Input
                  type="email"
                  name="mailto"
                  value={data.mailto}
                  placeholder="Email address"
                  onChange={handleOnChange}
                />
                <Input
                  type="text"
                  name="subject"
                  value={data.subject}
                  placeholder="Subject"
                  onChange={handleOnChange}
                />
              </div>
              <div>
                <TextArea
                  name="body"
                  type="text"
                  value={data.body}
                  placeholder="Message"
                  onChange={handleOnChange}
                ></TextArea>
              </div>
            </Div>
            <Input
              type="submit"
              value="Send"
              style={{
                color: "white",
                background: "#e74c3c",
                cursor: "pointer",
                width: "100%",
              }}
            />
          </Form>
        </Container>
      )}
    </>
  );
}

//=========================================

// This where you can process the query and try to convert it into some meaningful data.
const queryToData = async ({ query }) => {
  if (!isTriggered(query, ["send", "email"], { substringMatch: true })) {
    return;
  }

  const res = query.split(" ");

  const data = {
    name: res[res.length - 1],
    config: query.includes("config"),
  };

  return data;
};

export { queryToData, Component };
