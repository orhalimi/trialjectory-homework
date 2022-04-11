import axios from "axios";
import constants from "../constants";
import currencyUtils from "../utils/currency";

class CurrencyApi {
  cache = {};

  async getExchangeRate(fromCurrency, toCurrency) {
    const url = `https://api.currencyapi.com/v3/latest?apikey=${process.env.CURRENCY_API_KEY}&base_currency=${fromCurrency}`;
    let exchangeRate;

    if (this._isCacheResultsAvailable(fromCurrency)) {
      exchangeRate = this.cache[fromCurrency].data;
    } else {
      const res = await axios.get(url);
      exchangeRate = res.data ? res.data.data : {};
      this.cache[fromCurrency] = {
        data: exchangeRate,
        initTime: Date.now(),
      };
    }
    if (!exchangeRate[toCurrency].value) {
      throw new Error("exchange rate wasn't found");
    }

    return currencyUtils.preciseExchangeRate(exchangeRate[toCurrency].value);
  }

  _isCacheResultsAvailable(fromCurrency) {
    if (this.cache[fromCurrency] && this.cache[fromCurrency].initTime) {
      const initTime = this.cache[fromCurrency].initTime;
      return Date.now() - initTime < constants.CURRENCY_API.CACHE_TIMEOUT;
    }
    return false;
  }
}

export default new CurrencyApi();
