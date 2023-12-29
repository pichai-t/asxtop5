import React from "react";
import GetPrice from "./GetPrice.js";

async function GetASX200() {

    // GET DATA for 200 Stocks
    var price = await GetPrice("NAB.AX");
    console.log("PRICE IS: " + JSON.stringify(price));

    // price = await GetPrice("CBA.AX");
    // console.log("PRICE IS: " + JSON.stringify(price));

    // TODO: Retrive DATA for 200 stocks
  

}

GetASX200();
