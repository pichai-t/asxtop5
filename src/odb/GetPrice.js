import axios from 'axios';
import * as c from '../common/Constants.js';

import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import "dotenv/config.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function GetPrice(stock) {

  const options = {
        method: 'GET',
        url: process.env.RAPIDAPI_PRICE_URL + stock.toLowerCase(),
        headers: {
          'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
          'X-RapidAPI-Host': process.env.RAPIDAPI_HOST
        }
  };
  
  var newJSON = {price: []};
  try {    
    const response = await axios.request(options);	
    var jsonObj = response.data;  
   // console.log(response.data);
    [jsonObj].map(function(dat) {
        var newObj = {};
        for (var i = 0; i < c.stockFields.length; i++) {
            if (dat.hasOwnProperty(c.stockFields[i])) {
                newObj[c.stockFields[i]] = dat[c.stockFields[i]];
            }
        }
        newJSON.price.push(newObj);
    });      
    console.log(newJSON);
    //
    // TODO: PROBLEM IS HERE????  maybe newJSON.price? 
    // 
    return newJSON; // document.write(JSON.stringify(newJSON));
  } catch (error) {
    console.error(error);
  }
  return -1;  
}

export default GetPrice;