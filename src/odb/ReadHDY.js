import schemas from "./models/schemas.js";
import mongooseConnect from "./utils/mongooseConnect.js";

function compareValues(a, b) {
  // if (a > b), More->Less // Otherwise Less->Move
  return a > b ? -1 : a > b ? 1 : 0;
}

async function ReadHDY() {
  await mongooseConnect();
  const hdy = schemas.HDY;
  var stockData = await hdy.find({}).exec();
  // check
  if (!stockData) {
    console.log("Nothing has been read from Highest Div Yield Table!");
  }
  // Do the sorting again, just to be sure (and higher hdy comes first!)
  stockData = stockData.sort(function (a, b) {
    return compareValues(a.dividendYield.raw, b.dividendYield.raw);
  });
  return stockData; // Should be only 5 records in HDY collection.
}

export default ReadHDY;
