import express from "express";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import "dotenv/config.js";
import * as c from "./src/common/Constants.js";
import { sleep } from "./src/common/Constants.js";

import ClearHDY from "./src/odb/utils/ClearHDY.js";
import ClearTop5Stocks from "./src/odb/utils/ClearTop5Stocks.js";

import GetPriceAPI from "./src/api/GetPriceAPI.js";
// import SavePrice from "./src/odb/SavePrice.js";
import UpdatePrice from "./src/odb/UpdatePrice.js"; // Either Save a new one or Update an existing one
import ReadPrice from "./src/odb/ReadPrice.js";

import ReadHDY from "./src/odb/ReadHDY.js";
import GetHDYList from "./src/odb/GetHDYList.js";
import SaveHDY from "./src/odb/SaveHDY.js";

import GetTop5StocksList from "./src/odb/GetTop5StocksList.js";
import SaveTop5Stocks from "./src/odb/SaveTop5Stocks.js";
import ReadTop5Stocks from "./src/odb/ReadTop5Stocks.js";

// Set variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const SERVER_PORT = 5000;

// Using Static
app.use(express.static("./client/build"));

// SECTION 1
app.get("/api/top5stocks", async (req, res) => {
  const top5Stocks = await ReadTop5Stocks();
  res.json({ top5stocks: top5Stocks });
});

// SECTION 2
app.get("/api/highestdivyield", async (req, res) => {
  const hdyData = await ReadHDY();
  res.json({ hdy: hdyData });
});

// SECTION 3
app.get("/api/asx200listing", async (req, res) => {
  const stockData = await ReadPrice();
  res.json({ stock: stockData });
});

//
// -------------- A D M I N  ----------------
//
app.get("/updatetop5", async (req, res) => {
  const numberOfTop5 = 5;
  console.log("Update TOP 5 STOCKS");

  // Clear Top5Stocks table
  await ClearTop5Stocks();

  //1. Read data from Price tables, then sorted them by DividendYield
  var top5stocksList = await GetTop5StocksList();
  top5stocksList =
    top5stocksList.length >= numberOfTop5
      ? top5stocksList.slice(0, numberOfTop5)
      : top5stocksList;
  console.log(top5stocksList);

  //2. Save the new Top5Stocks list into 'Top5Stocks' collection
  top5stocksList.map(async (st, id) => {
    await SaveTop5Stocks(st);
  });

  res.send("ADMIN: /updatetop5");
});

app.get("/updatehdy", async (req, res) => {
  const numberOfHDY = 5;
  console.log("Update Highest Dividend Yields");

  // Clear HDY table
  await ClearHDY();

  //1. Read data from Price tables, then sorted them by DividendYield
  var hdyList = await GetHDYList();
  hdyList =
    hdyList.length >= numberOfHDY ? hdyList.slice(0, numberOfHDY) : hdyList;

  //2. Save the new HDY list into 'HDY' collection
  hdyList.map(async (st, id) => {
    await SaveHDY(st);
  });

  res.send("ADMIN: /updatehdy");
});

app.get("/update", async (req, res) => {

  // if slice(0, 10) ===>  0, 1, 2, 3,...,8, 9  -- (10 numbers)
  var base = 0;
  const targetedStocks = c.ASX200STOCKS.slice(base, 2);
  console.log(targetedStocks);

  // Pull data from RAPID API and SAVE into MONGO DB
  const all200asx = await targetedStocks.map(async (st, id) => {
    // 1. Pull
    const rtn = await GetPriceAPI(st + ".AX");
    await sleep(2000); // milli-seconds

    // 2. Update an existing one or create a new one
    setTimeout(async function () {
      if (typeof rtn.price != "undefined") {
        UpdatePrice(rtn.price[0]); // SavePrice(rtn.price[0]);
      }
    }, 2000);

    return rtn; // return for *.map()
  });

  res.send("ADMIN: (main) /update");
});

app.get("*", async (req, res) => {
  // to show a dummy page (client page) as well if user calls server port!
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

app.listen(SERVER_PORT, () => {
  console.log("Server has started on " + SERVER_PORT);
});

// =======================================
// BACKUP:
// =======================================
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
//     }
//   ],
// });

// ADHOC!!
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
