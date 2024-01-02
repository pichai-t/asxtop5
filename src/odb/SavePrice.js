import schemas from "./models/schemas.js";
import mongooseConnect from "./mongooseConnect.js";

async function SavePrice(price) {
  await mongooseConnect();
  const newStock = new schemas.Stocks(price);
  const saveStock = await newStock.save();
  if (saveStock) {
    console.log("It's saved successfully!");
  }
}

export default SavePrice;
