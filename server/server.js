import express from "express";
import fs from "fs";
import csv from "csv-parser";
import cors from "cors";
import { error } from "console";
import {saveTestResult} from './routes/route.js'

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());


app.post('/save-result', saveTestResult);

let questions = [];

function loadCSV() {
  return new Promise((res, rej) => {
    const results = [];

    fs.createReadStream("./dataBase/terrorData.csv")
      .pipe(csv())
      .on("data", (data) => {
        results.push(data);
      })
      .on("end", () => {
        res(results);
      })
      .on("error", (error) => {
        rej(error);
      });
  });
}

async function startServer() {
  try {
    questions = await loadCSV();
    console.log(questions);

    console.log("CSV Loaded Successfully");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error loading CSV:", error);
  }
}

startServer();

app.get("/api/complaints", async (req, res) => {
  try {
    const result = await loadCSV("./dataBase/terrorData.csv");
    const items = result.slice(0,50);
    
    res.status(200).json({ Array: items});
  } catch (error) {
    console.error(error);
  }
});



