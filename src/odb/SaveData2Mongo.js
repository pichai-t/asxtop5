import express from "express";
import schemas from "./models/schemas.js";

async function SaveData2Mongo() {
    const newStock = new schemas.Stocks (
        {
            symbol: "PT3",
            ask: "13.1",
            bid: "13.0"
        }
    )
    const saveStock = await newStock.save();    
    if(saveStock) { console.log("It's saved successfully!"); } 
}

export default SaveData2Mongo;