import schemas from "./models/schemas.js";
import mongooseConnect from "./utils/mongooseConnect.js";

async function UpdatePrice(price) {
  await mongooseConnect();
  const newStocks = schemas.Stocks;

  // Try to find it first:
  const stockData = await newStocks.find({ symbol: price.symbol }).exec();
  if (stockData.length > 0) {
    // Find One and Update:
    const updatedStock = await newStocks
      .findOneAndUpdate({ symbol: price.symbol }, { $set: price })
      .exec();
    if (updatedStock) {
      console.log("It's UPDATED -- find One and Updated.");
    }
  } else {
    const newStock = new schemas.Stocks(price);
    const saveStock = await newStock.save();
    if (saveStock) {
      console.log("It's saved A NEW ONE successfully!");
    }
  }
}

export default UpdatePrice;
