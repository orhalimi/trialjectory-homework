import constants from "../constants";
import CurrencyApi from "../integrations/currencyapi";
import currencyUtils from "../utils/currency";

async function getQuote(req, res) {
  const {
    from_currency_code: fromCurrencyCode,
    amount,
    to_currency_code: toCurrencyCode,
  } = req.query;

  if (!isValidInput(fromCurrencyCode, amount, toCurrencyCode)) {
    return res.status(400).send({ message: "invalid input" });
  }

  try {
    const exchangeRate = await CurrencyApi.getExchangeRate(
      fromCurrencyCode,
      toCurrencyCode
    );

    return res.json({
      exchange_rate: exchangeRate,
      currency_code: toCurrencyCode,
      amount: currencyUtils.exchangeCurrency(amount, exchangeRate),
    });
  } catch (e) {
    res.status(500).send({ message: "Exchange rate wasn't found" });
  }
}

function isValidInput(fromCurrencyCode, amount, toCurrencyCode) {
  const supportedCurrencies = Object.keys(constants.CURRENCY_CODE);
  if (
    supportedCurrencies.includes(fromCurrencyCode) &&
    supportedCurrencies.includes(toCurrencyCode) &&
    fromCurrencyCode !== toCurrencyCode &&
    Number.isInteger(Number(amount)) &&
    amount > 0
  ) {
    return true;
  }
  return false;
}

export default { getQuote };
