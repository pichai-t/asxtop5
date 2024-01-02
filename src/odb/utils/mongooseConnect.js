import mongoose from "mongoose";
import cors from "cors";

import path, { dirname }  from "path";
import { fileURLToPath } from 'url';
import "dotenv/config.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const mongooseConnect = async () => {
  try {
    // console.log(process.env.MONGO_URI);
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Mongoose connection started.");
  } catch (err) {
    console.log("Mongoose connection error: " + err);
  }
};

export default mongooseConnect;
