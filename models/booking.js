const mongoose = require('mongoose');

// Define the Booking Schema
const bookingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    guests: {
        type: Number,
        required: true
    }
});

// Create and export the Booking model
const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;
