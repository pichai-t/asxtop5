import mongoose, { Schema } from "mongoose";

//1. Setup Schema for each
const stockSchema = new Schema({
  symbol: { type: String },
  typeDisp: { type: String, default: "n/a" },
  regularMarketPrice: { type: Object, default: { raw: "n/a", fmt: "n/a" } },
  regularMarketDayHigh: { type: Object, default: { raw: "n/a", fmt: "n/a" } },
  regularMarketDayLow: { type: Object, default: { raw: "n/a", fmt: "n/a" } },
  epsCurrentYear: { type: Object, default: { raw: "n/a", fmt: "n/a" } },
  trailingPE: { type: Object, default: { raw: "n/a", fmt: "n/a" } },
  ask: { type: Object, default: { raw: "n/a", fmt: "n/a" } },
  bid: { type: Object, default: { raw: "n/a", fmt: "n/a" } },
  longName: { type: String, default: "n/a" },  
  averageAnalystRating: { type: String, default: "n/a" },
  dividendYield: { type: Object, default: "n/a" },
  indicators: { type: Object, default: "n/a" },
  priceGrowth: { type: String, default: "No" },
});

const hdySchema = new Schema({
  symbol: { type: String },
  typeDisp: { type: String, default: "n/a" },
  regularMarketPrice: { type: Object, default: { raw: "n/a", fmt: "n/a" } }, 
  longName: { type: String, default: "n/a" },    
  dividendYield: { type: Object, default: "n/a" }
});

const top5stocksSchema = new Schema({
  symbol: { type: String },
  typeDisp: { type: String, default: "n/a" },
  regularMarketPrice: { type: Object, default: { raw: "n/a", fmt: "n/a" } }, 
  longName: { type: String, default: "n/a" },    
  dividendYield: { type: Object, default: "n/a" },
  indicators: { type: Object, default: "n/a" },
  priceGrowth: { type: String, default: "No" },
});

const configSchema = new Schema({
  config1: { type: String },
  config2: { type: String },
});

// 2. To name/wrap 'stockSchema, configSchema', ... (above) as
//    'Stocks, Config', ... and linked to collections/tables (within 'asx200listing' database -- as per MONGO_URI "../asx200listing")
const Stocks = mongoose.model("Stocks", stockSchema, "stocks");
const HDY = mongoose.model("HDY", hdySchema, "hdy");
const Top5Stocks = mongoose.model("Top5Stocks", top5stocksSchema, "top5stocks");
const Config = mongoose.model("Config", configSchema, "config");

// ENUM for COLLECTIONS
export const COLLECTIONS = { Stocks: "Stocks", HDY: "HDY", Top5Stocks: "Top5Stocks"};

// 3. Conbine all Schemas into one Constant  (and Export it)
const schemas = { Stocks: Stocks, HDY: HDY, Top5Stocks: Top5Stocks, Config: Config };
export default schemas;
