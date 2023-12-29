import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import 'dotenv/config';

// Temp
import SaveData2Mongo from "./SaveData2Mongo.js";

const app = express();
const SERVER_PORT = 7000;

app.use(express.json()); 

const mongooseConnection = async () => {

    try {
        console.log(process.env.MONGO_URI);
        await mongoose.connect('mongodb+srv://appminglestudio:Abcd6594@cluster0.n95dubc.mongodb.net/asx200listing'); 
        console.log("Mongoose connection started.");
    }
    catch (err) {
        console.log("Mongoose connection error: " + err);
    }

}

app.get("/", async (req, res) => {
    await mongooseConnection();
    await SaveData2Mongo();
    res.send("Hello");    
});

app.listen(SERVER_PORT, () => {
    console.log("Server is running at Port: " + SERVER_PORT);
});