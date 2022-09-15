import { PaymentInputsWrapper, usePaymentInputs } from "react-payment-inputs";
import images from "react-payment-inputs/images";
import React, { useState } from "react";

export default function PaymentInputs() {
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
  console.log(cardNumber, expiryDate, cvc, zip);
  return (
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
  );
}
