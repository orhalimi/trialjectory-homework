# currency exchange widget

To run:

```
npm install
npm start
```

This is a currency exchange widget. Supported currencies are USD, EUR and ILS.

It response to the current get request:

```
GET: /<BASE_URL>/api/quote?from_currency_code=X&amount=Y&to_currency_code=Z

from_currency_code: 3 letters currency code.

amount: Integer. The amount to convert in cents

to_currency_code: 3 letters currency code.
```

Response:

```
{
exchange_rate: XXX,
currency_code: <SUPPORTED_CODE>
}

currency_code: 3 letters currency code. The currency of the amount.

exchange_rate: Decimal, the offered exchange rate. Up to 3 decimal digits

```
