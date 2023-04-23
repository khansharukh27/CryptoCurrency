// Importing React library
import React from 'react';

// Defining a functional component named CoinD which takes props as an argument
const CoinD = (props) => {

  // Destructuring the 'market_cap_change_percentage_24h' from the props object
  let { market_cap_change_percentage_24h } = props;

  // Returning JSX
  return (
    <div>
      {/* Linking to the CoinGecko website */}
      <a href={`https://www.coingecko.com/en/coins/${props.id}`} style={{ textDecoration: "none" }}>
        {/* Creating a row containing coin details */}
        <div className='row d-flex flex-row '>
          {/* Displaying the coin image */}
          <div className="col-4 pe-5" style={{ height: "50px", width: "50px" }}>
            <img src={props.image} alt="coin" style={{ height: "50px", width: "50px" }}></img>
          </div>
          {/* Displaying the coin name and market cap */}
          <div className="col-4 ">
            <h5>{props.name}</h5>
            <p>mkt_cap ${props.market_cap}</p>
          </div>
          {/* Displaying the percentage change in market cap */}
          <div className='col-4'>
            {market_cap_change_percentage_24h < 0 ?
              (<p style={{ color: "red" }}> &#9660; {props.market_cap_change_percentage_24h}</p>) :
              (<p style={{ color: "green" }}>&#9650; {props.market_cap_change_percentage_24h}</p>)}
          </div>
        </div>
      </a>
    </div>
  )
}

// Exporting the CoinD component
export default CoinD;
