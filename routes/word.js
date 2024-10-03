const express = require('express');
const axios = require('axios');
const Word = require('../models/Word.js');
const dotenv = require("dotenv")
dotenv.config();

const router = express.Router();
const app_id = process.env.APP_ID;
const app_key = process.env.APP_KEY;
//Add a new word
router.post('/', async (req, res) => {
    const { word } = req.body;
    wordsArray = []
    try {

        let cachedWord = await Word.findOne({ word });
        if (cachedWord) {
            return res.json(cachedWord);
        }
        const response = await axios.get(`https://od-api-sandbox.oxforddictionaries.com/api/v2/search/en-gb?q=${word}`, {
            headers: {
                'app_id': app_id,
                'app_key': app_key
            }
        });
        const answer = response.data.results
        console.log(answer)
        const { results } = response.data;
        if (!results || results.length === 0) {
            return res.status(404).json({ error: 'Word not found in Oxford API' });
        }


        // Extract entries from the results
        const entries = results.map(result => ({
            id: result.id,
            label: result.label,
            matchString: result.matchString,
            matchType: result.matchType,
            score: result.score,
            region: result.region || 'N/A'  // Optional: if region exists, otherwise 'N/A'
        }));

        // Create the word object with multiple entries
        const wordObject = {
            word,
            entries
        };

        // Save the word in MongoDB
        const newWord = await new Word(wordObject).save();

        res.json(newWord);
    } catch (error) {
        console.error('Error fetching word from Oxford API:', error.message);
        if (error.response) {
            console.error('Oxford API Response:', error.response.data);
        }
        res.status(500).json({ error: error.message });
    }
});




router.get('/:searchWord', async (req, res) => {
    const { searchWord } = req.params;

    try {
        let word = await Word.findOne({ word: searchWord });
        if (!word) {
            return res.status(404).json({ error: 'Word not found' });
        }
        res.json(word);
    } catch (error) {
        console.error('Error fetching word from database:', error.message);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;