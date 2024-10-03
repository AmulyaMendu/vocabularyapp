const mongoose = require('mongoose');


const entrySchema = new mongoose.Schema({
    id: { type: String },
    label: { type: String },
    matchString: { type: String },
    matchType: { type: String },
    score: { type: Number },
    region: { type: String }
});

const WordSchema = new mongoose.Schema({
    word: { type: String, required: true },
    entries: [entrySchema]  // Array of entry objects
});

module.exports = mongoose.model('Word', WordSchema);