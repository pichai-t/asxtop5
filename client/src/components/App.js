import React, {useState, useEffect} from 'react';
import '../App.css';

function App() {

  const [backendData, setBackendData] = useState([{}]);
  
  useEffect( () => {
    fetch("/api").then( 
        response => response.json()).then(
          data => {
            setBackendData(data)
          }
        )
  }, []);

  return (
   <div>
   <div class="header">
     <h1 > Top 5 ASX </h1>
   </div>

   <div class="tabset">  
    <input type="radio" name="tabset" id="tab1" aria-controls="marzen" checked/>
    <label for="tab1">Märzen</label>
    <input type="radio" name="tabset" id="tab2" aria-controls="rauchbier" />
    <label for="tab2">Rauchbier</label>
    <input type="radio" name="tabset" id="tab3" aria-controls="dunkles" />
    <label for="tab3">Dunkles Bock</label>
    
    <div class="tab-panels">
      <section id="marzen" class="tab-panel">
        <h2>Data 1</h2>

      <div>
      { (typeof backendData.users === 'undefined') ? (
       <h3> Loading....</h3>
       ) : (
         backendData.users.map(  (user, id) => (
         <p key={id}>  {user} </p>
       )) )
      }
      </div>

    </section>
      <section id="rauchbier" class="tab-panel">
        <h2>6B. Rauchbier</h2>
        <p><strong>Overall Impression:</strong>  An elegant, malty German amber lager with a balanced, complementary beechwood smoke character. Toasty-rich malt in aroma and flavor, restrained bitterness, low to high smoke flavor, clean fermentation profile, and an attenuated finish are characteristic.</p>
        <p><strong>History:</strong> A historical specialty of the city of Bamberg, in the Franconian region of Bavaria in Germany. Beechwood-smoked malt is used to make a Märzen-style amber lager. The smoke character of the malt varies by maltster; some breweries produce their own smoked malt (rauchmalz).</p>
      </section>
      <section id="dunkles" class="tab-panel">
        <h2>6C. Dunkles Bock</h2>
        <p><strong>Overall Impression:</strong> A dark, strong, malty German lager beer that emphasizes the malty-rich and somewhat toasty qualities of continental malts without being sweet in the finish.</p>
        <p><strong>History:</strong> Originated in the Northern German city of Einbeck, which was a brewing center and popular exporter in the days of the Hanseatic League (14th to 17th century). Recreated in Munich starting in the 17th century. The name “bock” is based on a corruption of the name “Einbeck” in the Bavarian dialect, and was thus only used after the beer came to Munich. “Bock” also means “Ram” in German, and is often used in logos and advertisements.</p>
      </section>
    </div>    
 </div>

 <div>
  <footer class="footer">
  	 <div class="container">
  	 	<div class="row">
  	 		<div class="footer-col">
  	 			<h4>company</h4>
  	 			<ul>
  	 				<li><a href="#">about us</a></li>
  	 				<li><a href="#">our services</a></li>
  	 				<li><a href="#">privacy policy</a></li>
  	 			</ul>
  	 		</div>
  	 		<div class="footer-col">
  	 			<h4>information</h4>
  	 			<ul>
            <li><a href="#">Our calculations</a></li>
  	 				<li><a href="#">FAQ</a></li>
  	 			</ul>
  	 		</div>
  	 		<div class="footer-col">
  	 			<h4>feedback</h4>
  	 			<ul>
  	 				<li><a href="#">Email us</a></li>
  	 			</ul>
  	 		</div>
  	 		{/* <div class="footer-col">
  	 			<h4>follow us</h4>
  	 			<div class="social-links">
  	 				<a href="#"><i class="fab fa-facebook-f"></i></a>
  	 				<a href="#"><i class="fab fa-twitter"></i></a>
  	 				<a href="#"><i class="fab fa-instagram"></i></a>
  	 				<a href="#"><i class="fab fa-linkedin-in"></i></a>
  	 			</div>
  	 		</div> */}
  	 	</div>
  	 </div>
  </footer>
</div>

</div>

)}

export default App