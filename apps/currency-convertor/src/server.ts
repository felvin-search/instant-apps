import axios from "axios";

const parseConversionString = (query) => {
  // Default amount is 1
  // Example: USD TO INR => {amount: 1, from: 'USD', to: 'INR'}
  // Example: 5 USD TO INR => {amount: 5, from: 'USD', to: 'INR'}
  const normalizedQuery = query.toUpperCase();
  if (normalizedQuery.includes(" TO ") || normalizedQuery.includes(" IN ")) {
    const tokens = normalizedQuery.split(" ");
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

async function fetchRates({ query }) {
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
  } catch (error) {
    // console.log("Error from Currency Convertor app");
    // console.log(error);
    return null;
  }
}

export default fetchRates;
