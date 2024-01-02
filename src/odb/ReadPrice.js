import schemas from "./models/schemas.js";
import mongooseConnect from "./utils/mongooseConnect.js";
import { compareStrings } from "../common/Constants.js";

async function ReadPrice() {
  await mongooseConnect();
  const stocks = schemas.Stocks;
  const stockData = await stocks.find({}).exec();
  // check
  if (!stockData) {
    console.log("Nothing has been read from Mongo DB!");
  }

  return stockData.sort(function (a, b) {
    return compareStrings(a.symbol, b.symbol);
  });
}

export default ReadPrice;
