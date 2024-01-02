import schemas from "./models/schemas.js";
import mongooseConnect from "./utils/mongooseConnect.js";
import * as c from "../common/Constants.js";

async function GetHDYList() {
  await mongooseConnect();
  const newStocks = schemas.Stocks;

  // Try to "find all" and "sort - descending (high to low)"
  var stockData = await newStocks.find({}).sort({ dividendYield: -1 }).exec();

  // In [Array], Filter it only 'Object' -- Only Object has values in it (raw, fmt).
  stockData = stockData.filter((st) => {
    if (typeof st.dividendYield == "object") {
      return st;
    }
  });

  // Log: Print
  // stockData.map( (st) => {   console.log(st.dividendYield.raw) })

  // Must filter into HDYSchema!!
  var newJSON = { hdy: [] };
  try {
    stockData.map(function (dat) {
      var newObj = {};
      for (var i = 0; i < c.hdyFields.length; i++) {
        console.log(dat[c.hdyFields[i]]);
        // if (dat.hasOwnProperty(c.hdyFields[i])) {
        newObj[c.hdyFields[i]] = dat[c.hdyFields[i]];
        // }
      }
      newJSON.hdy.push(newObj);
    });
  } catch (error) {
    console.error(error);
  }
  return newJSON.hdy;
}

export default GetHDYList;
