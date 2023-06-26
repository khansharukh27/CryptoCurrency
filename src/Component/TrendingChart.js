// This line imports React and some hooks from the React library
import React, { useState, useEffect } from 'react'

// This line imports PieChart, Pie, and Cell from the Recharts library
import { PieChart, Pie, Cell,ResponsiveContainer } from 'recharts'

// This line is commented out, but would import format from the date-fns library
// import {format} from 'date-fns'

// This line is commented out, but would import getCryptoData from a file named Api
// import { getCryptoData } from './Api'

// This line imports axios, which will be used to make an API call
import axios from 'axios';

// This is a functional component named TrendingChart
const TrendingChart = () => {

  // These lines use the useState hook to create a state variable named coinData
  const [coinData, setCoinData] = useState([]);

  // This is a useEffect hook that runs once on component mount
  useEffect(() => {


    // This is an async function that fetches data from the CoinGecko API
    const fetchData = async () => {

      // This line uses axios to make an API call to the CoinGecko API's trending endpoint
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/search/trending`
      );

      // This line slices the top 3 coins from the API response
      const top3Coins = response.data.coins.slice(0, 3)

      // This line sets the coinData state variable to the top 3 coins
      setCoinData(top3Coins);

      // This line logs the top 3 coins to the console
      console.log(top3Coins)
    };

    // This line calls the fetchData function
    fetchData();
  }, []);

  // This is the JSX code that is returned by the TrendingChart component
  return (
    <div className='row'>
      <div className='col-8'>
        <h2>Top 3 Trending Coins by Market Cap Rank</h2>
        <div className='d-md-flex' >
          <div className=' mb-4 ' style={{}}>
            <ResponsiveContainer width={300} height={300}>
              <PieChart>
                <Pie
                  data={coinData}
                  dataKey="item.market_cap_rank"
                  nameKey="item.name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  label={(entry) => entry.item.market_cap_rank}
                >
                  {/* This code maps over the coinData array and generates a different color for each pie slice */}
                  {coinData.map((entry, index) => (
                    <Cell key={`cell-${index.market_cap_rank}`} fill={index === 0 ? '#0088FE' : index === 1 ? '#00C49F' : '#FFBB28'} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className=' mt-5'>
            {/* This code maps over the coinData array and generates a list of the top 3 coins */}
            {coinData && coinData.map((col, index) => {
              return (
                <ul key={`list-${index}`}>
                  <li style={{ color: index === 0 ? '#0088FE' : index === 1 ? '#00C49F' : '#FFBB28' }}>
                    {col.item.name}
                  </li>
                </ul>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// This line exports the TrendingChart component as the default export of this
export default TrendingChart