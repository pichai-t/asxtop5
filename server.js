import exp from "constants";
import express from "express";
import path from "path";

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const SERVER_PORT = 5000;

app.get('/api', (req, res) => {
    res.json( {"users": ["Pichai1", "Pichai2", "Pichai3", "Pichai5  "]} ); 
});

// Using Static
app.use(express.static("./client/build")); 
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client","build", "index.html"));
})

app.listen( SERVER_PORT, () => {
    console.log("Server has started on " + SERVER_PORT);
})