import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';

const RESULTS_FILE_PATH = path.resolve('results.json');


export const saveTestResult = (req, res) => {
    const { score } = req.body;
    
    if (score === undefined) {
        return res.status(400).json({ message: "Score is required" });
    }

    const newResult = {
        date: new Date().toLocaleString(),
        score: score
    };

    fs.readFile(RESULTS_FILE_PATH, 'utf8', (err, data) => {
        let resultsArray = [];
        
        if (!err && data) {
            try {
                resultsArray = JSON.parse(data);
            } catch (e) {
                resultsArray = [];
            }
        }

        resultsArray.push(newResult);

        fs.writeFile(RESULTS_FILE_PATH, JSON.stringify(resultsArray, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ message: "Failed to save result" });
            }
            res.status(201).json({ message: "Result saved successfully", result: newResult });
        });
    });
};