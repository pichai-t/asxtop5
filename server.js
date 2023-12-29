import express from "express";
import GetPrice from "./src/odb/GetPrice.js";

import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import "dotenv/config.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const SERVER_PORT = 5000;

app.get('/api', async (req, res) => {
  
  // REAL REQUEST ===
  // var price = await GetPrice('WOW.AX');
  // res.json(price);
  // ================

  // MOCKED DATA FOR NOW: =========
  res.json( {"price": [
  {
    symbol: 'PIC.AX',
    dividendYield: { raw: 5.47, fmt: '5.47%' },
    dividendRate: { raw: 1.68, fmt: '1.68' },
    trailingPE: { raw: 13.360869, fmt: '13.36' },
    ask: { raw: 30.73, fmt: '30.73' },
    bid: { raw: 30.72, fmt: '30.71' },
  }
  ]}); 
  // ==============================
  
});

app.get('/api/hightestdivyield', (req, res) => {
    res.json( 
    [
        { "code": "BHP",
          "price": "$50.26"
        },
        { "code": "CBA",
          "price": "$111.19"
        }
    ]
    ); 
});

app.get('/api/asx200listing', async (req, res) => {
  res.json( {"stock": [
    {
      symbol: 'NAB.AX',
      dividendYield: { raw: 5.47, fmt: '5.47%' },
      dividendRate: { raw: 1.68, fmt: '1.68' },
      trailingPE: { raw: 13.360869, fmt: '13.36' },
      ask: { raw: 30.73, fmt: '30.73' },
      bid: { raw: 30.72, fmt: '30.71' },
    },
    {
      symbol: 'CBA.AX',
      dividendYield: { raw: 5.47, fmt: '5.47%' },
      dividendRate: { raw: 1.68, fmt: '1.68' },
      trailingPE: { raw: 13.360869, fmt: '13.36' },
      ask: { raw: 90.73, fmt: '90.73' },
      bid: { raw: 90.72, fmt: '90.71' },
    },
    {
      symbol: 'FMG.AX',
      dividendYield: { raw: 5.47, fmt: '5.47%' },
      dividendRate: { raw: 1.68, fmt: '1.68' },
      trailingPE: { raw: 13.360869, fmt: '13.36' },
      ask: { raw: 30.73, fmt: '30.73' },
      bid: { raw: 30.72, fmt: '30.71' },
    }
  ]}); 
});




// Using Static
app.use(express.static("./client/build")); 
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client","build", "index.html"));
})

app.listen( SERVER_PORT, () => {
    console.log("Server has started on " + SERVER_PORT);
})