import mongoose, { Schema } from "mongoose";

//1. Setup Schema for each
const stockSchema = new Schema(
    {
      symbol: {type: String},
      regularMarketPrice: {type: Object},
      regularMarketDayHigh: {type: Object},
      regularMarketDayLow: {type: Object},
      epsCurrentYear: {type: Object},
      trailingPE: {type: Object},
      ask: {type: Object},
      bid: {type: Object}  
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
