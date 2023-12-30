import schemas from "./models/schemas.js";
import mongooseConnect from "./mongooseConnect.js";

async function ReadPrice() {    
  await mongooseConnect();
  const stocks = schemas.Stocks;
  const stockData = await stocks.find ( {} ).exec();
  if (!stockData) {
    console.log("Nothing has been read from Mongo DB!");
  }
  return stockData;
}

export default ReadPrice;
