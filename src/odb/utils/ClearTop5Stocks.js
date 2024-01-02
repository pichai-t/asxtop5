import schemas from "../models/schemas.js";
import mongooseConnect from "./mongooseConnect.js";

async function ClearTop5Stocks() {
  await mongooseConnect();
  const clearedTop5Stocks = await schemas.Top5Stocks.deleteMany({});
  if (clearedTop5Stocks) {
    console.log(" Top5Stocks has been cleared/deleted all successfully!");
  }
}

export default ClearTop5Stocks;
