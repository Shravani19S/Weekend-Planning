const mongoose = require('mongoose');

const getawaySchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true }
});

const Getaway = mongoose.model('Getaway', getawaySchema);
module.exports = Getaway;
