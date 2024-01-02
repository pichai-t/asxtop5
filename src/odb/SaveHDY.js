import schemas from "./models/schemas.js";
import mongooseConnect from "./utils/mongooseConnect.js";

async function SaveHDY(hdy) {
  await mongooseConnect();
  // New HDY
  const newHDY = new schemas.HDY(hdy);
  const savedHDY = await newHDY.save();
  if (savedHDY) {
    console.log("HDY list has been saved successfully!");
  }
}

export default SaveHDY;
