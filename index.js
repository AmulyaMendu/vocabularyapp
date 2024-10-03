const express = require('express');
const axios = require('axios');
var cors = require("cors")
const dotenv = require("dotenv")
const bodyParser = require('body-parser');
const connectDB = require("./config/db.js");
const wordRoutes = require('./routes/word.js');

dotenv.config();

//database config
connectDB()
const app = express();
app.use(bodyParser.json({ type: 'application/*+json' }))


app.use(cors())
app.use(express.json())
app.use('/api/words', wordRoutes);

// const source_lang = "en-gb"

app.get('/api/search', async (req, res) => {
    const word = req.query.q;
    const url = `https://od-api-sandbox.oxforddictionaries.com/api/v2/search/en-gb?q=${word}`;

    try {
        const response = await axios.get(url, {
            headers: {
                'app_id': process.env.APP_ID,
                'app_key': process.env.APP_KEY,
            },
        });
        res.json(response.data);
        console.log(response.data)
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ error: "Failed to fetch data from Oxford API" });
    }
});


const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
