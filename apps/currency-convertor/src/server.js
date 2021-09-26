import axios from "axios";

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
  } catch {
    return null;
  }
}

export default fetchRates;
