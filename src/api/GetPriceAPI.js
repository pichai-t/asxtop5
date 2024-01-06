import axios from "axios";
import * as c from "../common/Constants.js";
import "dotenv/config.js";

async function GetPriceAPI(stock) {
  console.log(stock);
  const optionAPI = {
      method: "GET",
      url: process.env.RAPIDAPI_PRICE_URL + stock.toLowerCase(),
      headers: { "X-RapidAPI-Key": process.env.RAPIDAPI_KEY, "X-RapidAPI-Host": process.env.RAPIDAPI_HOST }
  };
  const optionsPriceAPI = {...optionAPI, url: process.env.RAPIDAPI_PRICE_URL + stock.toLowerCase()}
  const optionsHistoricAPI = {...optionAPI, url: process.env.RAPIDAPI_HISTORIC_URL + stock.toLowerCase() + "/1mo/5y"}
 
  var newJSON = { price: [] };
  var newObj = {};
  
  // ** 1) Basic Stock Information from 'PRICE API'
  try {
    const response = await axios.request(optionsPriceAPI);
    var jsonObj = response.data;
    console.log(jsonObj);
    [jsonObj].map(function (dat) {
      for (var i = 0; i < c.priceFields.length; i++) {
        if (dat.hasOwnProperty(c.priceFields[i])) {
          newObj[c.priceFields[i]] = dat[c.priceFields[i]];
        }
      }      
    });
  } catch (error) {
    console.error(error.error);
  }

  // ** 2) HISTORIC Stock Information from 'HISTORIC API'
  console.log('About to get into Step 2');
  try {    
    const response = await axios.request(optionsHistoricAPI);
    var jsonObj = response.data;
    [jsonObj].map(function (dat) {
      for (var i = 0; i < c.historicFields.length; i++) {
        if (dat.hasOwnProperty(c.historicFields[i])) {
          newObj[c.historicFields[i]] = dat[c.historicFields[i]];
        }
      }
    });
  } catch (error) {    
    console.error(error);
  }

  // ** 3) Hard-coded to calculate 'priceGrowth' field; 
  if (typeof newObj["indicators"] != 'undefined') {
    console.log (newObj["indicators"].quote[0].close[0]);
    newObj["priceGrowth"] = (newObj["indicators"].quote[0].close[0] < newObj["regularMarketPrice"].raw) ? "Yes" : "No" ;
  }

  console.log(newObj);
  newJSON.price.push(newObj);
  return newJSON; // document.write(JSON.stringify(newJSON));
}

export default GetPriceAPI;