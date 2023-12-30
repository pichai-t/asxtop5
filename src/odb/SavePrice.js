import schemas from "./models/schemas.js";

async function SavePrice(price) {
  const newStock = new schemas.Stocks(price);
  const saveStock = await newStock.save();
  if (saveStock) {
    console.log("It's saved successfully!");
  }
}

export default SavePrice;
