import schemas from "./models/schemas.js";
import mongooseConnect from "./utils/mongooseConnect.js";
import * as c from "../common/Constants.js";

async function GetTop5StocksList() {
  await mongooseConnect();
  const newStocks = schemas.Stocks;

  // Try to "find when 'priceGrowth = Yes' " and sort by DividendYield - descending (high to low)"
  var stockData = await newStocks
    .find({ priceGrowth: "Yes" })
    .sort({ dividendYield: -1 })
    .exec();

  // In [Array], Filter it only 'Object' -- Only Object has values in it (raw, fmt).
  stockData = stockData.filter((st) => {
    if (typeof st.dividendYield == "object") {
      return st;
    }
  });

  // Log: Print
  // stockData.map( (st) => {   console.log(st.dividendYield.raw) })

  // Must filter into top5stocksSchema!!
  var newJSON = { top5stocks: [] };
  try {
    stockData.map(function (dat) {
      var newObj = {};
      for (var i = 0; i < c.top5stocksFields.length; i++) {
        console.log(dat[c.top5stocksFields[i]]);
        // if (dat.hasOwnProperty(c.hdyFields[i])) {
        newObj[c.top5stocksFields[i]] = dat[c.top5stocksFields[i]];
        // }
      }
      newJSON.top5stocks.push(newObj);
    });
  } catch (error) {
    console.error(error);
  }
  return newJSON.top5stocks;
}

export default GetTop5StocksList;
