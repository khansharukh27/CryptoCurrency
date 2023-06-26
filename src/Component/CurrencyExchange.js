// This line imports the useState and useEffect hooks from the React library.
import { useState, useEffect } from 'react';

// This defines a functional component called CurrencyExchange.
function CurrencyExchange() {
  // These four lines define the state variables using the useState hook.
  const [cryptoData, setCryptoData] = useState([]);
  const [nationalCurrency, setNationalCurrency] = useState('usd');
  const [convertedNationalCurrency, setConvertedNationalCurrency] = useState('eur');
  const [cryptoAmount, setCryptoAmount] = useState('');

  // This useEffect hook is called when the component mounts, and it fetches the exchange rate data from the Coingecko API.
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`https://api.coingecko.com/api/v3/exchange_rates`);
  const data = await response.json();
      setCryptoData(data.rates);
    } 
    fetchData();
  }, []);

  // This function is called when the user enters a value for the amount of cryptocurrency they want to sell.
  function handleCryptoAmountChange(e) {
    setCryptoAmount(e.target.value);
  }

  // This function calculates the amount of national currency that the user will receive in exchange for their cryptocurrency.
  function calculateNationalCurrencyAmount() {
    if (cryptoAmount && cryptoData[nationalCurrency] && cryptoData[convertedNationalCurrency]) {
      const exchangeRate = cryptoData[convertedNationalCurrency].value / cryptoData[nationalCurrency].value;
      const nationalCurrencyAmount = cryptoAmount * exchangeRate;
      return nationalCurrencyAmount.toFixed(3);
    } else {
      return '';
    }
  }

  // This function is called when the user selects a different national currency to exchange their cryptocurrency for.
  function handleConvertedNationalCurrencyChange(e) {
    setConvertedNationalCurrency(e.target.value);
  }

  // This is   the JSX code that is rendered to the screen. It displays a header, two select menus for the currencies, and an input field for the amount of cryptocurrency to sell.
  // It also displays the calculated amount of national currency that the user will receive in exchange.
  return (
    <div class="d-flex align-items-start flex-column mb-3" >
      <div class="mb-5 p-2" >
      <h1> Exchange Rates</h1>
      </div>
      <div>
        <label className='d-flex me-3' style={{ color: "orange" }}>
          Sell:
          <select value={nationalCurrency} class="form-select form-select-lg ms-2 mb-2" style={{ width: "80px", backgroundColor: 'grey' }} onChange={(e) => setNationalCurrency(e.target.value)}>
            {Object.entries(cryptoData).map(([currency, data]) => (
              <option className='me-3' key={currency} value={currency}>
                {`${currency.toUpperCase()} (${data.name})`}
              </option>
            ))}
          </select>
          <input className='ms-2' type="number" value={cryptoAmount} style={{ width: "80px" }} onChange={handleCryptoAmountChange} />
        </label>
        <div className='d-flex me-3 '>
          <label className='d-flex me-3 mb-3 ' style={{ color: "green" }}> Buy:
            <select value={convertedNationalCurrency} class="form-select form-select-lg ms-2" style={{ height: "50px", width: '80px', backgroundColor: 'grey' }} onChange={handleConvertedNationalCurrencyChange}>
              {Object.entries(cryptoData).map(([currency, data]) => (
                <option key={currency} value={currency}>
                  {`${currency.toUpperCase()} (${data.name})`}
                </option>
              ))}
            </select>
            <p className='ms-2' style={{ width: "80px" }}>{`${calculateNationalCurrencyAmount()} ${convertedNationalCurrency.toUpperCase()}`}</p>
          </label>

        </div>
      </div>
    </div>
  );
}

export default CurrencyExchange;