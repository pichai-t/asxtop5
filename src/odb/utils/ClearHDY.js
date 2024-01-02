import schemas from "../models/schemas.js";
import mongooseConnect from "./mongooseConnect.js";

async function ClearHDY() {
  await mongooseConnect();
  const clearedHDY = await schemas.HDY.deleteMany({});
  if (clearedHDY) {
    console.log("HDY list has been saved successfully!");
  }
}

export default ClearHDY;
