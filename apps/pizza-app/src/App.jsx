import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { isTriggered } from "@felvin-search/core";
import db from "./data.json";
import axios from "axios";
import { PaymentInputsWrapper, usePaymentInputs } from "react-payment-inputs";
import images from "react-payment-inputs/images";
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
  //background-color: ${(prop) => (prop.veg ? "green" : "red")};
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

const Pizza = ({
  value,
  id,
  pizza,
  price,
  desc,
  image,
  setValue,
  isVeg,
  code,
}) => {
  const [add, setAdd] = useState(false);
  const [size, setSize] = useState("s");

  // const handleClick = () => {
  //   setAdd(!add);
  // };
  // useEffect(() => {
  //   if (add) {
  //     setValue((pre) => pre + price);
  //   } else {
  //     if (value) setValue((pre) => (pre - price > 0 ? pre - price : 0));
  //   }
  // }, [add]);
  // useEffect(()=>{
  //    setValue(pre=>eval(pre+sizeValue))
  // },[sizeValue])
  const handleClick = async () => {
    const storeId = localStorage.getItem("storeID");
    console.log(size);
    if (Boolean(storeId)) {
      const res = await axios.post("https://dominos.fly.dev/item", {
        pizza_code: code[size],
      });
      const res1 = await axios.post("https://dominos.fly.dev/order", {
        storeID: storeId,
      });
      console.log(res, res1);
      setValue({
        price: res1.data.price,
        time: res1.data.time,
      });
      setAdd(!add);
    }
  };
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
          {/* <Locations>${price.toFixed(2)}</Locations> */}
        </Div>
        <ShortDesc>{desc}</ShortDesc>
        <TagContainer>
          <Select value={size} onChange={(e) => setSize(e.target.value)}>
            <option value="s">Small</option>
            <option value="m">Medium</option>
            <option value="l">Large</option>
          </Select>
          <Tags veg={isVeg}>{isVeg ? "🟢" : "🔴"}</Tags>
          <Add onClick={handleClick}>{!add ? "add" : "remove"}</Add>
        </TagContainer>
      </Div>
    </Cards>
  );
};
const PageThree = ({ setStep, value }) => {
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
        Your Pizza will be delivered in {value.time &&
          `${value.time} minutes`}{" "}
        minutes
        <br />
        <br />
        {value.price && `Total Amount: $${value.price}`}
        <br />
        <Button onClick={() => setStep(0)}>Back To Home</Button>
      </div>
    </Container>
  );
};

const PageTwo = ({ setStep, setValue, value }) => {
  const {
    wrapperProps,
    getCardImageProps,
    getCardNumberProps,
    getExpiryDateProps,
    getCVCProps,
    getZIPProps,
  } = usePaymentInputs();
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvc, setCvc] = useState("");
  const [zip, setZip] = useState("");

  console.log(expiryDate.replace(/\s+/g, ""));
  const handleCheckout = async () => {
    const res = await axios.post("https://dominos.fly.dev/pay", {
      cardNumber: cardNumber.split(" ").join("-"),
      expiryDate: expiryDate.replace(/\s+/g, ""),
      cardCode: cvc,
      cardPostalCode: zip,
    });
    console.log(res);
    if (res.status == 200) {
      setStep(2);
    } else {
      alert("Payment Failed");
    }
  };

  return (
    <Container>
      {db.map((el, id) => (
        <Pizza value={value} setValue={setValue} key={id} {...el} />
      ))}
      <PaymentInputsWrapper {...wrapperProps}>
        <svg {...getCardImageProps({ images })} />
        <input
          {...getCardNumberProps({
            onChange: (e) => setCardNumber(e.target.value),
          })}
          value={cardNumber}
        />
        <input
          {...getExpiryDateProps({
            onChange: (e) => setExpiryDate(e.target.value),
          })}
          value={expiryDate}
        />
        <input {...getCVCProps({ onChange: (e) => setCvc(e.target.value) })} />
        <input
          {...getZIPProps({ onChange: (e) => setZip(e.target.value) })}
          value={zip}
        />
      </PaymentInputsWrapper>
      <Button onClick={() => handleCheckout()}>Checkout</Button>
      Total Cost: {value.price && `${value.price} USD`}
      <br />
      Estimated Time: {value.time && `${value.time} minutes`}
      <Button onClick={() => setStep(0)}>Back</Button>
    </Container>
  );
};
const PageOne = ({ setStep, onChangeHandler, details, setStoreID }) => {
  const [validated, setValidated] = useState(null);
  const HandleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://dominos.fly.dev/nearby", {
        firstname: details.firstname,
        lastname: details.lastname,
        email: details.email,
        phone: details.phone,
        address: `${details.street},${details.city},${details.state},${details.zip}`,
      })
      .then((res) => {
        // console.log(res);
        if (res.status == 200 && res.data.storeID) {
          setValidated(200);
        }

        localStorage.setItem("storeID", res.data.storeID);
      })
      .catch((err) => {
        console.log(err);
        setValidated(err.response.status);
        localStorage.setItem("storeID", null);
      });
  };
  useEffect(() => {
    console.log(validated);
    if (validated == 200) {
      setStep(1);
    } else if (validated == 404) {
      alert("No Open Stores!!");
    }
  }, [validated]);
  return (
    <Form onSubmit={HandleSubmit}>
      <Header src="https://1000logos.net/wp-content/uploads/2021/01/Dominos-logo.jpg" />
      <p style={{ zIndex: "3" }}>Enter Your Details</p>
      <Div style={{ display: "flex", gap: "0.5rem" }}>
        <Input
          type="text"
          onChange={onChangeHandler}
          name="firstname"
          placeholder="First Name"
        />
        <Input
          type="text"
          onChange={onChangeHandler}
          name="lastname"
          placeholder="Last Name"
        />
      </Div>
      <Div style={{ display: "flex", gap: "0.5rem" }}>
        <Input
          type="email"
          onChange={onChangeHandler}
          name="email"
          placeholder="Email"
        />
        <Input
          type="number"
          onChange={onChangeHandler}
          name="phone"
          placeholder="Phone"
        />
      </Div>
      <Div style={{ display: "flex", gap: "0.5rem" }}>
        <Input
          type="text"
          onChange={onChangeHandler}
          name="street"
          placeholder="Street Address"
        />
        <Input
          type="number"
          onChange={onChangeHandler}
          name="zip"
          placeholder="Zip Address"
        />
      </Div>
      <Div style={{ display: "flex", gap: "0.5rem" }}>
        <Input
          type="text"
          onChange={onChangeHandler}
          name="city"
          placeholder="City"
        />
        <Input
          type="text"
          onChange={onChangeHandler}
          name="state"
          placeholder="State"
        />
      </Div>
      {/* <TextField placeholder="Address" /> */}
      <Button type="submit">Next</Button>
    </Form>
  );
};
//=========================================

// Your UI logic goes here.
// `data` prop is exactly what is returned by queryToData.
function Component({ data }) {
  const [step, setStep] = useState(0);
  const [value, setValue] = useState({
    price: null,
    time: null,
  });

  const [details, setDetails] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    street: "",
    zip: "",
    city: "",
    state: "",
  });
  const onChangeHandler = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
    // console.log(details);
  };
  return (
    <Container>
      {step === 0 ? (
        <PageOne
          details={details}
          setStep={setStep}
          onChangeHandler={onChangeHandler}
        />
      ) : step === 1 ? (
        <PageTwo value={value} setValue={setValue} setStep={setStep} />
      ) : (
        <PageThree setStep={setStep} value={value} />
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
