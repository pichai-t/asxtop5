import React, {useState, useEffect} from 'react';
import '../App.css';

function App() {

  const [backendData, setBackendData] = useState([{}]);
  const [asx200listing, setAsx200listing] = useState([{}]);
  const [hightestdivyield, setHightestdivyield] = useState([{}]);
  
  useEffect( () => {
    // PULL DATA TO DISPLAY
    fetch("/api/top5stocks").then( 
        response => response.json()).then(
          data => {
            setBackendData(data)
          }
        )
  }, []);

  useEffect( () => {
    // PULL DATA TO DISPLAY
    fetch("/api/hightestdivyield", {
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }} 
        ).then( 
        response => response.json()).then(
          data => {
            setHightestdivyield(data);
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
    <input type="radio" name="tabset" id="tab1" aria-controls="marzen" />
    {/* https://www.marketindex.com.au/scans/fundamentally-sound */}    
    <label htmlFor="tab1"> Top 5 Stocks (by MarketIndex.com)</label>    
    <input type="radio" name="tabset" id="tab2" aria-controls="rauchbier" />
    {/* https://www.marketindex.com.au/highest-dividend-yield */}
    <label htmlFor="tab2">  Highest Dividend Yield (1 yr)</label>
    <input type="radio" name="tabset" id="tab3" aria-controls="dunkles" defaultChecked/>
    <label htmlFor="tab3">ASX 200 Listing</label>
    
    <div className="tab-panels">

     {/* SECTION 1 */}
      <section id="marzen" className="tab-panel">
        <h2>Data 1</h2>
      <div>
      { (typeof backendData.price === 'undefined') ? (
       <h3> Loading....</h3>
       ) : (
         backendData.price.map( (pr, id) => (
         <p key={id}>  {pr.symbol} </p>
       )) )
      }
      </div>
    </section>

    {/* SECTION 2 */}
    <section id="rauchbier" className="tab-panel">
      <h2>DATA 2</h2>
        <p> xxx </p>
        <p> xxx </p>
        <p> xxx </p>
    </section>
    
    {/* SECTION 3 */}
    <section id="dunkles" className="tab-panel">
        <h2>ASX 200 Stock listing</h2>
        <table>        
        <thead>
            <tr>
                <th>Symbol</th>
                <th>Type</th>
                <th>Price</th>
                <th> High </th>
                <th> Low </th>
                <th> Ask </th>
                <th> Bid </th>
                <th> Earning Per Share </th>
                <th> Price to Earning </th>
            </tr>
        </thead>
        <tbody>
          {/* DATA */}
          { (typeof asx200listing.stock === 'undefined') ? (
          <h2> Loading....</h2>  ) : (
            asx200listing.stock.map( (s, id) => (
            <tr key={id}>            
            <td>{s.symbol.substring(0,3)}</td> <td>{s.typeDisp.substring(0,3)} </td><td>${s.regularMarketPrice.fmt}</td> 
            <td>${s.regularMarketDayHigh.fmt}</td> <td>${s.regularMarketDayLow.fmt}</td> 
            <td>${s.ask.fmt}</td> <td>${s.bid.fmt}</td> 
            <td>{s.epsCurrentYear.fmt}</td> <td>${s.trailingPE.fmt}</td> 

            </tr>
          )))
          }

        </tbody>
    </table>

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