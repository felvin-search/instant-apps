import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

// Keep the logic of making the API call seperate from the component definition
// Ideally the component shouldn't make an API call.
// We should give lot of example snippet apps which people can fork and create their own apps
// The single API end point waala cheez might restrict people
// People might want to do make all kind of api calls and do lot of random stuff, maybe we should allow it
// In terms of libraries and all, we can install most of the popular libraries
// We'll need to balance performance & customizability

const currencies = [
  { value: "AUD", label: "Australian Dollar" },
  { value: "BGN", label: "Bulgarian Lev" },
  { value: "BRL", label: "Brazilian Real" },
  { value: "CAD", label: "Canadian Dollar" },
  { value: "CHF", label: "Swiss Franc" },
  { value: "CNY", label: "Chinese Renminbi Yuan" },
  { value: "CZK", label: "Czech Koruna" },
  { value: "DKK", label: "Danish Krone" },
  { value: "EUR", label: "Euro" },
  { value: "GBP", label: "British Pound" },
  { value: "HKD", label: "Hong Kong Dollar" },
  { value: "HRK", label: "Croatian Kuna" },
  { value: "HUF", label: "Hungarian Forint" },
  { value: "IDR", label: "Indonesian Rupiah" },
  { value: "ILS", label: "Israeli New Sheqel" },
  { value: "INR", label: "Indian Rupee" },
  { value: "ISK", label: "Icelandic Króna" },
  { value: "JPY", label: "Japanese Yen" },
  { value: "KRW", label: "South Korean Won" },
  { value: "MXN", label: "Mexican Peso" },
  { value: "MYR", label: "Malaysian Ringgit" },
  { value: "NOK", label: "Norwegian Krone" },
  { value: "NZD", label: "New Zealand Dollar" },
  { value: "PHP", label: "Philippine Peso" },
  { value: "PLN", label: "Polish Złoty" },
  { value: "RON", label: "Romanian Leu" },
  { value: "RUB", label: "Russian Ruble" },
  { value: "SEK", label: "Swedish Krona" },
  { value: "SGD", label: "Singapore Dollar" },
  { value: "THB", label: "Thai Baht" },
  { value: "TRY", label: "Turkish Lira" },
  { value: "USD", label: "United States Dollar" },
  { value: "ZAR", label: "South African Rand" },
];

const Input = styled.input`
  color: #363636;
  background-color: #fff;
  box-shadow: inset 0 0.0625em 0.125em rgba(10, 10, 10, 0.05);
  border: 1px solid #dbdbdb;
  border-radius: 4px;

  -webkit-appearance: none;

  margin: 0.5rem;
  padding: 10px;
  outline: none;

  &::placeholder {
    color: rgba(54, 54, 54, 0.3);
  }

  &:hover {
    border-color: #b5b5b5;
  }
`;

const Select = styled.select`
  color: #363636;
  background-color: #fff;
  box-shadow: inset 0 0.0625em 0.125em rgba(10, 10, 10, 0.05);
  border: 1px solid rgba(95, 38, 255, 0.5);
  border-radius: 4px;

  cursor: pointer;
  margin: 0.5rem;
  padding: 10px;
  outline: none;
`;

function CurrenyConvertor(props) {
  const [inputCurrency, setInputCurrency] = useState("INR");
  const [outputCurrency, setOutputCurrency] = useState("USD");

  const [inputValue, setInputValue] = useState();
  const [outputValue, setOutputValue] = useState();

  const [loaded, setLoaded] = useState(false);

  // Loading the money.js script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "/money.js";
    document.body.appendChild(script);
    script.addEventListener("load", () => setLoaded(true));
  }, []);

  // This sets the rates and the base currency after the script has been loaded
  useEffect(() => {
    if (!loaded) {
      return;
    }

    window.fx.rates = props.data.rates;
    window.fx.base = props.data.base;
  }, [loaded]);

  const handleConversion = (amount, input, output, way) => {
    if (way == 1) {
      setInputValue(amount);
    } else {
      setOutputValue(amount);
    }
    return window.fx.convert(amount, { from: output, to: input });
  };

  return (
    <div class="flex flex-col">
      <div class="flex md:flex-row flex-col">
        <Input
          value={inputValue}
          placeholder="Input Currency"
          onChange={(e) => {
            setOutputValue(
              handleConversion(e.target.value, outputCurrency, inputCurrency, 1)
            );
          }}
        />
        <Select
          value={inputCurrency}
          onChange={(e) => setInputCurrency(e.target.value)}
        >
          {currencies.map((currency) => (
            <option key={currency.value} value={currency.value}>
              {currency.label}
            </option>
          ))}
          <div></div>
        </Select>
      </div>
      <div class="flex md:flex-row flex-col ">
        <Input
          value={outputValue}
          placeholder="Output Currency"
          onChange={(e) => {
            setInputValue(
              handleConversion(e.target.value, inputCurrency, outputCurrency, 2)
            );
          }}
        />
        <Select
          value={outputCurrency}
          onChange={(e) => setOutputCurrency(e.target.value)}
        >
          {currencies.map((currency) => (
            <option key={currency.value} value={currency.value}>
              {currency.label}
            </option>
          ))}
        </Select>
      </div>
    </div>
  );
}

async function fetchRates() {
  const { data } = await axios.get("https://api.frankfurter.app/latest");
  return data;
}

// Accept an object, gives you more flexibility
const CurrencyConversionApp = {
  name: "Currency Convertor",
  id: "currency_convertor",
  description: "Convert currencies",
  logo: "",
  dataFetcher: fetchRates,
  renderer: CurrenyConvertor,
};

export default CurrencyConversionApp;
