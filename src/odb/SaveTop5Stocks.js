import schemas from "./models/schemas.js";
import mongooseConnect from "./utils/mongooseConnect.js";

async function SaveTop5Stocks(top5) {
  await mongooseConnect();
  // New Top5Stocks
  const newTop5Stocks = new schemas.Top5Stocks(top5);
  const savedTop5Stocks = await newTop5Stocks.save();
  if (savedTop5Stocks) {
    console.log("Top5Stocks list has been saved successfully!");
  }
}

export default SaveTop5Stocks;
