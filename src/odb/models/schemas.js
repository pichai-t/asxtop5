import mongoose, { Schema } from "mongoose";

//1. Setup Schema for each
const stockSchema = new Schema(
    {
      symbol: {type: String},
      typeDisp: {type: String, default: "n/a"}, 
      regularMarketPrice: {type: Object, default: {raw: "n/a", fmt: "n/a"}},
      regularMarketDayHigh: {type: Object, default: {raw: "n/a", fmt: "n/a"}},
      regularMarketDayLow: {type: Object, default: {raw: "n/a", fmt: "n/a"}},
      epsCurrentYear: {type: Object, default: {raw: "n/a", fmt: "n/a"}},
      trailingPE: {type: Object, default: {raw: "n/a", fmt: "n/a"}},
      ask: {type: Object, default: {raw: "n/a", fmt: "n/a"}},
      bid: {type: Object, default: {raw: "n/a", fmt: "n/a"}},
      longname:  {type: String, default: "n/a"}
    }
);
const configSchema = new Schema(
  {
    config1: {type: String}, 
    config2:  {type: String}
  }
);

// 2. To name/wrap 'stockSchema, configSchema' (above) as 
//    'Stocks, Config' and linked to 'stocks, config' collection/table (within 'asx200listing' database -- as per MONGO_URI "../asx200listing")
const Stocks = mongoose.model('Stocks', stockSchema, 'stocks');
const Config = mongoose.model('Config', configSchema, 'config');

// 3. Conbine all Schemas into one Constant  (and Export it)
const schemas = {'Stocks': Stocks, 'Config': Config}; 
export default schemas;
