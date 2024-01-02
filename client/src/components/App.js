import React, {useState, useEffect} from 'react';
import '../App.css';

function App() {

  const [top5stocksData, setTop5StocksData] = useState([{}]);
  const [asx200listing, setAsx200listing] = useState([{}]);
  const [highestdivyield, setHighestdivyield] = useState([{}]);
  
  useEffect( () => {
    // PULL DATA TO DISPLAY
    fetch("/api/top5stocks").then( 
        response => response.json()).then(
          data => {
            setTop5StocksData(data)
          }
        )
  }, []);

  useEffect( () => {
    // PULL DATA TO DISPLAY
    fetch("/api/highestdivyield", {
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }} 
        ).then( 
        response => response.json()).then(
          data => {
            setHighestdivyield(data);
          }
        )
  }, []);

  useEffect( () => {
    // PULL DATA TO DISPLAY
    fetch("/api/asx200listing", {
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }} 
        ).then( 
        response => response.json()).then(
          data => {
            setAsx200listing(data);
          }
        )
  }, []);


  return (
  <div>
   <div className="header">
     <h1 > ASX Top 5 </h1>
   </div>

   <div className="tabset">  
    <input type="radio" name="tabset" id="tab1" aria-controls="marzen" defaultChecked/>
    {/* https://www.marketindex.com.au/scans/fundamentally-sound */}    
    <label htmlFor="tab1"> Top 5 Stocks </label>    
    <input type="radio" name="tabset" id="tab2" aria-controls="rauchbier" />
    {/* https://www.marketindex.com.au/highest-dividend-yield */}
    <label htmlFor="tab2">  Highest Dividend Yield (2023-24)</label>
    <input type="radio" name="tabset" id="tab3" aria-controls="dunkles" />
    <label htmlFor="tab3">ASX 200 Listing</label>
    
    <div className="tab-panels">

     {/* SECTION 1 */}
      <section id="marzen" className="tab-panel">
        <h2>Top 5 Stocks </h2>
        <div className="container">
          <br />
          <h4> Criteria: </h4>
          <ol>
            <li> ASX 200 stocks only </li>
            <li> Positive Price Growth (for the last 5 years)</li>
            <li> Positive Dividend Growth (for the last 5 years)</li>
            <li> Highest Dividend Yields (Currently)</li>
          </ol>
          <br />
        </div>
        <table>        
        <thead>
            <tr>
                <th>Symbol</th>
                <th style={{textAlign: "left" }} >Name </th>
                <th>Type</th>
                <th>Price</th>

                <th>Price Growth (5 yrs was)</th>
                <th>Div. Growth </th>
                <th>DividendYield</th>
            </tr>
        </thead>
        <tbody>
          {/* DATA */}
          { (typeof top5stocksData.top5stocks === 'undefined') ? (
          <h2> Loading....</h2>  ) : (
            top5stocksData.top5stocks.map( (s, id) => (
            <tr key={id}>            
            <td style={{fontWeight: 600 }}>{s.symbol.substring(0,3)}</td>
            <td style={{textAlign: "left" }}> {s.longName}</td> 
            <td>{s.typeDisp.substring(0,3)} </td><td style={{fontWeight: 500 }} >${s.regularMarketPrice.fmt.substring(0,5)}</td>             
            <td style={{fontWeight: 400 }} >{s.priceGrowth} (${s.indicators.quote[0].close[0].toString().substring(0,4)})</td>
            <td style={{fontWeight: 400 }} >Yes</td>
            <td style={{fontWeight: 600 }} >{s.dividendYield.fmt}</td>
            </tr>
          )))
          }
        </tbody>
    </table>








    </section>

    {/* SECTION 2 */}
    <section id="rauchbier" className="tab-panel">
        <h2>Top 5 Stocks with Highest Dividend Yield (2023/24) - ASX 200 Only</h2>
        <table>        
        <thead>
            <tr>
                <th>Symbol</th>
                <th style={{textAlign: "left" }} >Name </th>
                <th>Type</th>
                <th>Price</th>
                <th>DividendYield</th>
            </tr>
        </thead>
        <tbody>
          {/* DATA */}
          { (typeof highestdivyield.hdy === 'undefined') ? (
          <h2> Loading....</h2>  ) : (
            highestdivyield.hdy.map( (s, id) => (
            <tr key={id}>            
            <td style={{fontWeight: 600 }}>{s.symbol.substring(0,3)}</td>
            <td style={{textAlign: "left" }}> {s.longName}</td> 
            <td>{s.typeDisp.substring(0,3)} </td><td style={{fontWeight: 500 }} >${s.regularMarketPrice.fmt.substring(0,5)}</td> 
            <td style={{fontWeight: 600 }} >{s.dividendYield.fmt}</td>
            </tr>
          )))
          }
        </tbody>
    </table>

    </section>
   
    {/* SECTION 3 */}
    <section id="dunkles" className="tab-panel">
        <h2>ASX 200 Stock Listing</h2> 
        <table>        
        <thead>
            <tr>
                <th>Symbol</th>
                <th style={{textAlign: "left" }} >Name </th>
                <th>Type</th>
                <th>Price</th>
                <th>High </th>
                <th>Low </th>
                <th>Ask </th>
                <th>Bid </th>
                <th>Earning Per Share </th>
                <th>Price to Earning </th>
            </tr>
        </thead>
        <tbody>
          {/* DATA */}
          { (typeof asx200listing.stock === 'undefined') ? (
          <h2> Loading....</h2>  ) : (
            asx200listing.stock.map( (s, id) => (
            <tr key={id}>            
            <td>{s.symbol.substring(0,3)}</td><td style={{textAlign: "left" }}> {s.longName}</td> 
            <td>{s.typeDisp.substring(0,3)} </td><td>${s.regularMarketPrice.fmt.substring(0,5)}</td> 
            <td>${s.regularMarketDayHigh.fmt.substring(0,5)}</td> <td>${s.regularMarketDayLow.fmt.substring(0,5)}</td> 
            <td>${s.ask.fmt}</td> <td>${s.bid.fmt}</td> 
            <td>{s.epsCurrentYear.fmt}</td> <td>{s.trailingPE.fmt}</td> 
            </tr>
          )))
          }
          
        </tbody>
    </table>
    <br />
    <h4>* Above data as of the last trading day (End of Day).</h4>
    </section>
    </div>    
  </div>
 <div>
  <footer className="footer">
  	 <div className="container">
  	 	<div className="row">
  	 		<div className="footer-col">
  	 			<h4>company</h4>
  	 			<ul>
  	 				<li><a href="#">about us</a></li>
  	 				<li><a href="#">our services</a></li>
  	 				<li><a href="#">privacy policy</a></li>
  	 			</ul>
  	 		</div>
  	 		<div className="footer-col">
  	 			<h4>information</h4>
  	 			<ul>
            <li><a href="#">Our calculations</a></li>
  	 				<li><a href="#">FAQ</a></li>
  	 			</ul>
  	 		</div>
  	 		<div className="footer-col">
  	 			<h4>feedback</h4>
  	 			<ul>
  	 				<li><a href="#">Email us</a></li>
  	 			</ul>
  	 		</div>
  	 		{/* <div className="footer-col">
  	 			<h4>follow us</h4>
  	 			<div className="social-links">
  	 				<a href="#"><i className="fab fa-facebook-f"></i></a>
  	 				<a href="#"><i className="fab fa-twitter"></i></a>
  	 				<a href="#"><i className="fab fa-instagram"></i></a>
  	 				<a href="#"><i className="fab fa-linkedin-in"></i></a>
  	 			</div>
  	 		</div> */}
  	 	</div>
  	 </div>
  </footer>
</div>
</div>

)}

export default App