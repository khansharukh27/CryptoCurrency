import React, { useEffect, useState } from 'react'
import './App.css';
import Navbar from './Component/Navbar';
import CoinD from './Component/CoinD';
import TrendingChart from './Component/TrendingChart';
import CurrencyExchange from './Component/CurrencyExchange';
import Chart from './Component/Chart';

function App() {
  const [coins, setCoins] = useState([])
  const [search, setSearch] = useState("")
  const [currencies, setCurrencies] = useState(['usd'])

  async function MyApi() {
    try {
      const response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currencies}&order=market_cap_desc&per_page=9&page=1&sparkline=false&price_change_percentage=1h&locale=en`)
      const result = await response.json();
      console.log(result);
      setCoins(result)
    } catch (error) {
      console.error("Error:", error);
    }
  }

  useEffect(() => {
    MyApi();
  }, [currencies])

  const handleSearchChange = (e) => {
    const ths = e.target.value
    setSearch(ths)
  }

  const filtredCoin = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="App">
      <div className='container-fluid'>
        <Navbar />
      </div>
      <div className='container-fluid bg-light'>
        <div className='row'>
          <div className='col-lg-8 col-md-12 ms-5'>
            <div className='row'>
              <div className='col-md-3'>
                <select
                  className="form-select form-select-lg mb-3"
                  onChange={(e) => setCurrencies(e.target.value)}
                  style={{ width: "100%" }}>
                  <option value="usd">USD</option>
                  <option value="eur">EUR</option>
                  <option value="jpy">JPY</option>
                  <option value="inr">INR</option>
                </select>
              </div>
              <div className='col-md-9'>
                <form>
                  <input key="id" className="form-control form-control-lg" type="text" placeholder="Search coin" aria-label=".form-control-lg example" onChange={handleSearchChange} />
                </form>
              </div>
            </div>
            <div className='row'>
              <div className='col-md-12'>
                <div className='bg-white rounded p-3 mb-3'>
                  <Chart name={filtredCoin[0]?.name} vName={currencies} />
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col-md-7'>
                <div className='bg-white rounded p-3 mb-3'>
                  <TrendingChart />
                </div>
              </div>
              <div className='col-md-5'>
                <div className='bg-white rounded p-3 mb-3'>
                  <CurrencyExchange />
                </div>
              </div>
            </div>


          </div>
          <div className=' col-md-3 ms-2 mt-2' style={{ boxShadow: '1px 2px 9px #F4AAB9', backgroundColor: "white" }}>

            <h1>Cryptocurrency by market cap</h1>
            {filtredCoin.map((coin) => {
              return (
                <CoinD key={coin.id} id={coin.id} name={coin.name} image={coin.image} market_cap={coin.market_cap} market_cap_change_percentage_24h={coin.market_cap_change_percentage_24h} />)
            })}

          </div>


        </div>
      </div>
    </div>
  )
}

export default App;