import axios from "axios";
import fx from "money";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

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

//------------Styled Components-----------------

const OutputString = styled.div`
  font-size: medium;
  padding: 0 0 1.25rem 0;
  text-align: center;
`;

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

const ColContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const RowContainer = styled.div`
  display: flex;
  flex-direction: row;

  @media (max-width: 640px) {
    flex-direction: column;
  }
`;

//===========================================

function ResultString({
  inputValue,
  inputCurrency,
  outputValue,
  outputCurrency,
}) {
  return (
    <OutputString>
      {inputValue} {currencyLabelToCurrencyName(inputCurrency)} equals{" "}
      <b>
        {outputValue} {currencyLabelToCurrencyName(outputCurrency)}
      </b>
    </OutputString>
  );
}

function Component(props) {
  const [inputCurrency, setInputCurrency] = useState(
    props.data.inputCurrency || "USD"
  );
  const [outputCurrency, setOutputCurrency] = useState(
    props.data.outputCurrency || "INR"
  );

  const [inputValue, setInputValue] = useState(props.data.amount || 1);
  const [outputValue, setOutputValue] = useState(0);
  const [way, setWay] = useState("forward");

  // Loading the money.js script
  useEffect(() => {
    fx.rates = props.data.rates;
    fx.base = props.data.base;
    setOutputValue(convert(inputValue, outputCurrency, inputCurrency, 1));
  }, []);

  const convert = (amount, input, output) => {
    return fx.convert(amount, { from: input, to: output }).toFixed(2);
  };

  useEffect(() => {
    if (way === "forward") {
      setOutputValue(convert(inputValue, inputCurrency, outputCurrency));
    }

    if (way === "reverse") {
      setInputValue(convert(outputValue, outputCurrency, inputCurrency));
    }
  }, [inputValue, outputValue, inputCurrency, outputCurrency, way]);

  return (
    <ColContainer>
      <ResultString
        inputValue={inputValue}
        inputCurrency={inputCurrency}
        outputValue={outputValue}
        outputCurrency={outputCurrency}
      />
      <RowContainer>
        <Input
          type="number"
          step="0.01"
          value={inputValue}
          placeholder="Input Currency"
          onChange={(e) => {
            setInputValue(e.target.value);
            setWay("forward");
          }}
        />
        <Select
          value={inputCurrency}
          onChange={(e) => {
            setInputCurrency(e.target.value);
            setWay("forward");
          }}
        >
          {currencies.map((currency) => (
            <option key={currency.value} value={currency.value}>
              {currency.label}
            </option>
          ))}
        </Select>
      </RowContainer>
      <RowContainer>
        <Input
          type="number"
          step="0.01"
          value={outputValue}
          placeholder="Output Currency"
          onChange={(e) => {
            setOutputValue(e.target.value);
            setWay("reverse");
          }}
        />
        <Select
          value={outputCurrency}
          onChange={(e) => {
            setOutputCurrency(e.target.value);
            setWay("forward");
          }}
        >
          {currencies.map((currency) => (
            <option key={currency.value} value={currency.value}>
              {currency.label}
            </option>
          ))}
        </Select>
      </RowContainer>
    </ColContainer>
  );
}

const currencyLabelToCurrencyName = (currencyLabel) => {
  return currencies.find((item) => item.value === currencyLabel)?.label;
};

const parseConversionString = (query) => {
  // Default amount is 1
  // Example: USD TO INR => {amount: 1, from: 'USD', to: 'INR'}
  // Example: 5 USD TO INR => {amount: 5, from: 'USD', to: 'INR'}
  // Example 5USD TO INR => {amount: 5, from: 'USD', to: 'INR'}
  const normalizedQuery = query.toUpperCase();
  if (normalizedQuery.includes(" TO ") || normalizedQuery.includes(" IN ")) {
    // The regex passed to the 1st split (/([0-9]+)/) splits a string around a sequence of integers (like "word123word" -> ["word", "123", "word"])
    const tokens = normalizedQuery.split(/([0-9]+)/).join(" ").split(" ").filter(s => s!=="");
    if (tokens.length === 3) {
      return { amount: 1, from: tokens[0], to: tokens[2] };
    } else if (tokens.length === 4) {
      try {
        const amount = parseInt(tokens[0]);
        return { amount, from: tokens[1], to: tokens[3] };
      } catch {
        return null;
      }
    }
    return null;
  }
};

const isValidCurrencyCode = (currencyCode) => {
  const validCodes = [
    "AUD",
    "BGN",
    "BRL",
    "CAD",
    "CHF",
    "CNY",
    "CZK",
    "DKK",
    "EUR",
    "GBP",
    "HKD",
    "HRK",
    "HUF",
    "IDR",
    "ILS",
    "INR",
    "ISK",
    "JPY",
    "KRW",
    "MXN",
    "MYR",
    "NOK",
    "NZD",
    "PHP",
    "PLN",
    "RON",
    "RUB",
    "SEK",
    "SGD",
    "THB",
    "TRY",
    "USD",
    "ZAR",
  ];
  return validCodes.includes(currencyCode);
};

// Todo: this should be a fuzzy match
const currencyNameToCurrencyCode = (currencyName) => {
  currencyName = currencyName.toUpperCase();
  const namesToCodes = {
    "AUSTRALIAN DOLLAR": "AUD",
    "BULGARIAN LEV": "BGN",
    "BRAZILIAN REAL": "BRL",
    "CANADIAN DOLLAR": "CAD",
    "SWISS FRANC": "CHF",
    "CHINESE RENMINBI YUAN": "CNY",
    "CZECH KORUNA": "CZK",
    "DANISH KRONE": "DKK",
    EURO: "EUR",
    "BRITISH POUND": "GBP",
    "HONG KONG DOLLAR": "HKD",
    "CROATIAN KUNA": "HRK",
    "HUNGARIAN FORINT": "HUF",
    "INDONESIAN RUPIAH": "IDR",
    "ISRAELI NEW SHEQEL": "ILS",
    "INDIAN RUPEE": "INR",
    RUPEE: "INR",
    "ICELANDIC KRÓNA": "ISK",
    "JAPANESE YEN": "JPY",
    "SOUTH KOREAN WON": "KRW",
    "MEXICAN PESO": "MXN",
    "MALAYSIAN RINGGIT": "MYR",
    "NORWEGIAN KRONE": "NOK",
    "NEW ZEALAND DOLLAR": "NZD",
    "PHILIPPINE PESO": "PHP",
    "POLISH ZŁOTY": "PLN",
    "ROMANIAN LEU": "RON",
    "RUSSIAN RUBLE": "RUB",
    "SWEDISH KRONA": "SEK",
    "SINGAPORE DOLLAR": "SGD",
    "THAI BAHT": "THB",
    "TURKISH LIRA": "TRY",
    "UNITED STATES DOLLAR": "USD",
    DOLLAR: "USD",
    "SOUTH AFRICAN RAND": "ZAR",
  };
  return namesToCodes[currencyName] || currencyName;
};

async function queryToData({ query }) {
  const { data } = await axios.get("https://api.frankfurter.app/latest");
  try {
    let { amount, from, to } = parseConversionString(query);
    from = currencyNameToCurrencyCode(from);
    to = currencyNameToCurrencyCode(to);
    if (isValidCurrencyCode(from) && isValidCurrencyCode(to)) {
      return {
        rates: data.rates,
        base: data.base,
        amount,
        inputCurrency: from,
        outputCurrency: to,
      };
    } else {
      return null;
    }
  } catch {
    return null;
  }
}

export { queryToData, Component };
