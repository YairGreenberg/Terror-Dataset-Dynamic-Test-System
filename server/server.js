import express from "express";
import fs from "fs";
import csv from "csv-parser";
import cors from "cors";
import { error } from "console";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

let questions = [];



function loadCSV() {
  return new Promise((res,rej)=>{
    const results = []

    fs.createReadStream('terrorData.csv')
    .pipe(csv())
    .on('data',(data)=>{
        results.push(data)
    }).on('end',()=>{
        res(results)
    })
    .on('error',(error)=>{
        rej(error)
    })
  }
)}



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



app.get("/api/questions", (req, res) => {
  let filteredQuestions = [...questions];

  const { category, difficulty, limit } = req.query;

  if (category) {
    filteredQuestions = filteredQuestions.filter(
      (q) => q.category === category
    );
  }

  if (difficulty) {
    filteredQuestions = filteredQuestions.filter(
      (q) => q.difficulty === difficulty
    );
  }

  if (limit) {
    filteredQuestions = filteredQuestions.slice(
      0,
      Number(limit)
    );
  }

  res.json(filteredQuestions);
});
// console.log(questions);

// const result = await readCsvFile("annual-enterprise-survey-2024-financial-year-provisional.csv");