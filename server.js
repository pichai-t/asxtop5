import express from "express";

const app = express();
const SERVER_PORT = 5000;

app.get('/api', (req, res) => {
    res.json( {"users": ["Pichai1", "Pichai2", "Pichai3", "Pichai5  "]} ); 
});

app.listen( SERVER_PORT, () => {
    console.log("Server has started on " + SERVER_PORT);
})