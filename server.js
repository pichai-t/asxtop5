import express from "express";
import GetPriceAPI from "./src/odb/GetPriceAPI.js";
import mongooseConnect from "./src/odb/mongooseConnect.js";
import SavePrice from "./src/odb/SavePrice.js";
import ReadPrice from "./src/odb/ReadPrice.js";
import * as c from "./src/common/Constants.js";

import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import "dotenv/config.js";
// Set variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const SERVER_PORT = 5000;

// Using Static
app.use(express.static("./client/build"));

// SECTION 1
app.get("/api/top5stocks", async (req, res) => {
  // REAL REQUEST ===
  // var price = await GetPrice('ANZ.AX');
  // console.log(price);

  // MOCKED DATA FOR NOW: =========
  var price = {
    price: [
      {
        symbol: "ANZ.AX",
        regularMarketPrice: { raw: 25.92, fmt: "25.92" },
        regularMarketDayHigh: { raw: 25.92, fmt: "25.92" },
        regularMarketDayLow: { raw: 25.81, fmt: "25.81" },
        epsCurrentYear: { raw: 2.13, fmt: "2.13" },
        trailingPE: { raw: 11.418503, fmt: "11.42" },
        ask: { raw: 23.77, fmt: "23.77" },
        bid: { raw: 23.77, fmt: "23.77" },
      },
    ],
  };
  res.json(price);
});

// ADHOC SAVE !!
// app.get("/save", async (req, res) => {
//   var price = {
//     symbol: "ANZ.AX",
//     regularMarketPrice: { raw: 25.99, fmt: "25.99" },
//     regularMarketDayHigh: { raw: 25.92, fmt: "25.92" },
//     regularMarketDayLow: { raw: 25.81, fmt: "25.81" },
//     epsCurrentYear: { raw: 2.13, fmt: "2.13" },
//     trailingPE: { raw: 11.418503, fmt: "11.42" },
//     ask: { raw: 23.77, fmt: "23.77" },
//     bid: { raw: 23.77, fmt: "23.77" },
//   };
//   // await mongooseConnect();
//   await SavePrice(price);
//   res.send("Hello.... /save");
// });

//// ADHOC READ !!
// app.get("/read", async (req, res) => {
//
//   console.log("Reading DATA");
//   // NO NEED? -- await mongooseConnect();
//   const stockData = await ReadPrice();
//
//   console.log(stockData);
//   res.send("Hello.... /READ!!");
// });

// SECTION 2
app.get("/api/hightestdivyield", (req, res) => {
  res.json([
    { code: "BHP", price: "$50.26" },
    { code: "CBA", price: "$111.19" },
  ]);
});

// SECTION 3
app.get("/api/asx200listing", async (req, res) => {
  const stockData = await ReadPrice();  
  console.log(stockData);
  console.log("=====================================");
  console.log ( " WE ARE IN /api/asx200listing !!!");
  console.log("=====================================");
  
  res.json({ stock: stockData });

  // res.json({
  //   stock: [
  //     {
  //       symbol: "NAB.AX",
  //       dividendYield: { raw: 5.47, fmt: "5.47%" },
  //       dividendRate: { raw: 1.68, fmt: "1.68" },
  //       trailingPE: { raw: 13.360869, fmt: "13.36" },
  //       ask: { raw: 30.73, fmt: "30.73" },
  //       bid: { raw: 30.72, fmt: "30.71" },
  //     },
  //     {
  //       symbol: "CBA.AX",
  //       dividendYield: { raw: 5.47, fmt: "5.47%" },
  //       dividendRate: { raw: 1.68, fmt: "1.68" },
  //       trailingPE: { raw: 13.360869, fmt: "13.36" },
  //       ask: { raw: 90.73, fmt: "90.73" },
  //       bid: { raw: 90.72, fmt: "90.71" },
  //     },
  //     {
  //       symbol: "FMG.AX",
  //       dividendYield: { raw: 5.47, fmt: "5.47%" },
  //       dividendRate: { raw: 1.68, fmt: "1.68" },
  //       trailingPE: { raw: 13.360869, fmt: "13.36" },
  //       ask: { raw: 30.73, fmt: "30.73" },
  //       bid: { raw: 30.72, fmt: "30.71" },
  //     },
  //   ],
  // });
});

app.get("/load", async (req, res) => {
  console.log("LOADING THE DEFAULT");

  // NO NEED? -- await mongooseConnect();

  // Pull data from RAPID API and SAVE into MONGO DB
  const all200asx = c.ASX200STOCKS.map(async (st, id) => {
    // 1. Pull
    const rtn = await GetPriceAPI(st + ".AX");

    // const rtn =
    //     {
    //       symbol: '444.AX'
    //       // regularMarketPrice: { raw: 25.99, fmt: "25.99" },
    //       // regularMarketDayHigh: { raw: 25.92, fmt: "25.92" },
    //       // trailingPE: { raw: 11.418503, fmt: "11.42" },
    //       // bid: { raw: 23.77, fmt: "23.77" },
    //     }

    // 2. SAVE
    setTimeout(async function () {
      console.log("wait 2 seconds...");
    }, 2000);

    if (typeof rtn.price != "undefined") {
      SavePrice(rtn.price[0]);
    }

    // Return for *.map()
    return await rtn;
  });

  console.log(all200asx);
  res.send("Hello.... /LOAD!! ");
});

app.get("*", async (req, res) => {
  await mongooseConnect();
  // TO SHOW DUMMY PAGE (Client page) as well if user calls server port!
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

app.listen(SERVER_PORT, () => {
  console.log("Server has started on " + SERVER_PORT);
});
