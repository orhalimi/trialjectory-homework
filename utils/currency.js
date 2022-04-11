import constants from "../constants";
import numbersUtils from "./numbers";

function preciseExchangeRate(num) {
  return numbersUtils.toFixed(num, constants.EXCHANGE_RATE_PRECISION);
}

function exchangeCurrency(amount, rate) {
  return Math.floor(amount * rate);
}

export default { preciseExchangeRate, exchangeCurrency };
