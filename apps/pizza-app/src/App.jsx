import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { isTriggered } from "@felvin-search/core";
import db from "./data.json";
//------------Styled Components-------------
// If you're unfamiliar with styled components
// start here https://styled-components.com/docs/basics#getting-started

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  padding: 5rem;
  position: relative;
  overflow: hidden;
`;
const Input = styled.input`
  padding: 0.5rem;
  font-size: 1.2rem;
  width: 10rem;
`;
const TextField = styled.textarea`
  height: 5rem;
  width: 100%;
  padding: 0.5rem;
  font-size: 1.2rem;
  width: 22rem;
`;

const Cards = styled.div`
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  border-radius: 10px;
  padding: 1rem;
  margin: 0.2rem;
  width: 500px;
  display: flex;
`;
const Img = styled.img`
  height: 100%;
  width: 100%;
`;
const Title = styled.p`
  margin: 0;
  font-weight: 700;
`;
const Locations = styled.p`
  margin: 0;
  font-size: smaller;
  font-weight: 100;
  margin-left: 20px;
`;
const ShortDesc = styled.p`
  margin: 10px 0;
  font-size: smaller;
  font-weight: 200;
`;
const Tags = styled.span`
  height: 20px;
  width: 20px;
  margin-left: 30px;
  background-color: ${(prop) => (prop.veg ? "green" : "red")};
  padding: 3px;
  border-radius: 50%;
  margin-right: auto;
  font-size: 12px;
  display: inline-flex;
  width: fit-content;
  align-items: center;
`;
const TagContainer = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;

const Add = styled.div`
  background: lightcyan;
  padding: 10px;
  cursor: pointer;
`;
const Header = styled.img`
  top: -50px;
  left: 0;
  height: 200px;
  width: 100%;
  position: absolute;
`;

const Select = styled.select`
  width: 40%;
  height: 35px;
  background: white;
  color: gray;
  padding-left: 5px;
  font-size: 14px;
  border: 1px black solid;
  border-radius: 5px;
  option {
    color: black;
    background: white;
    display: flex;
    white-space: pre;
    min-height: 20px;
    padding: 0px 2px 1px;
  }
`;
const Button = styled.button`
  background: #f2f2f2;
  border: 1px solid #f2f2f2;
  border-radius: 5px;
  padding: 0.5rem;
  font-size: 1.2rem;
  cursor: pointer;
  &:hover {
    background: #e6e6e6;
  }
`;

const Div = styled.div``;

const Pizza = ({ value, id, pizza, price, desc, image, setValue }) => {
  const [add, setAdd] = useState(false);
  const [sizeValue, setSizeValue] = useState(0);
  console.log(sizeValue);
  const handleClick = () => {
    setAdd(!add);
  };
  useEffect(() => {
    if (add) {
      setValue((pre) => pre + price);
    } else {
      if (value) setValue((pre) => (pre - price > 0 ? pre - price : 0));
    }
  }, [add]);
  // useEffect(()=>{
  //    setValue(pre=>eval(pre+sizeValue))
  // },[sizeValue])
  return (
    <Cards>
      <Div
        style={{
          borderRadius: "50%",
          overflow: "hidden",
          height: "75px",
          width: "75px",
        }}
      >
        <Img src={image} />
      </Div>
      <Div style={{ marginLeft: "20px", width: "70%" }}>
        <Div style={{ display: "flex" }}>
          <Title>{pizza}</Title>
          <Locations>${price.toFixed(2)}</Locations>
        </Div>
        <ShortDesc>{desc}</ShortDesc>
        <TagContainer>
          <Select
            value={sizeValue}
            onChange={(e) => setSizeValue(e.target.value)}
          >
            <option value={0}>Small</option>
            <option value={5}>Medium</option>
            <option value={10}>Large</option>
          </Select>
          <Tags veg>veg</Tags>
          <Add onClick={handleClick}>{!add ? "add" : "remove"}</Add>
        </TagContainer>
      </Div>
    </Cards>
  );
};
const PageThree = ({ setStep }) => {
  return (
    <Container>
      <div
        style={{
          boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
          padding: "5rem",
        }}
      >
        Your Order Confirmed!!
        <br />
        <br />
        Your Pizza will be delivered in 30 minutes
        <br />
        <Button onClick={() => setStep(0)}>Back To Home</Button>
      </div>
    </Container>
  );
};

const PageTwo = ({ setStep, setValue, value }) => {
  return (
    <Container>
      {db.map((el, id) => (
        <Pizza value={value} setValue={setValue} key={id} {...el} />
      ))}
      <Button onClick={() => setStep(2)}>Checkout</Button>
      Total Cost: $ {value}
      <Button onClick={() => setStep(0)}>Back</Button>
    </Container>
  );
};
const PageOne = ({ setStep }) => {
  const HandleSubmit = (e) => {
    e.preventDefault();
    setStep(1);
  };

  return (
    <Form onSubmit={HandleSubmit}>
      <Header src="https://1000logos.net/wp-content/uploads/2021/01/Dominos-logo.jpg" />
      <p style={{ zIndex: "3" }}>Enter Your Details</p>
      <Div style={{ display: "flex", gap: "0.5rem" }}>
        <Input type="text" placeholder="First Name" />
        <Input type="text" placeholder="Last Name" />
      </Div>
      <Div style={{ display: "flex", gap: "0.5rem" }}>
        <Input type="email" placeholder="Email" />
        <Input type="number" placeholder="Phone" />
      </Div>
      <TextField placeholder="Address" />
      <Button type="submit">Next</Button>
    </Form>
  );
};
//=========================================

// Your UI logic goes here.
// `data` prop is exactly what is returned by queryToData.
function Component({ data }) {
  const [step, setStep] = useState(0);
  const [value, setValue] = useState(0);
  return (
    <Container>
      {step === 0 ? (
        <PageOne setStep={setStep} />
      ) : step === 1 ? (
        <PageTwo value={value} setValue={setValue} setStep={setStep} />
      ) : (
        <PageThree setStep={setStep} />
      )}
    </Container>
  );
}

//=========================================

// This where you can process the query and try to convert it into some meaningful data.
const queryToData = async ({ query }) => {
  if (!isTriggered(query, ["order", "pizaa"], { substringMatch: true })) {
    return;
  }

  // You can do any external API call or use any library here
  // to convert the search query into some meaningful data.
  // The data gets passed to the UI Component defined above.

  const data = query.toUpperCase();

  return data;
};

export { queryToData, Component };
