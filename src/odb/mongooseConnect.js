import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import "dotenv/config.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// "mongodb+srv://appminglestudio:Abcd6594@cluster0.n95dubc.mongodb.net/asx200listing"

const mongooseConnect = async () => {
  try {
    console.log(process.env.MONGO_URI);
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Mongoose connection started.");
  } catch (err) {
    console.log("Mongoose connection error: " + err);
  }
};

export default mongooseConnect;
