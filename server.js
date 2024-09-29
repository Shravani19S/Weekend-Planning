const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const axios = require('axios'); // Using axios instead of request

// Initialize the Express app
const app = express();
const PORT = process.env.PORT || 5001; // Changed from 5000 to 5001

// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/weekend-planner')
    .then(() => console.log('MongoDB connected'))
    .catch(err => {
        console.error('MongoDB connection error:', err);
        process.exit(1); // Exit process with failure
    });

// Schema for events
const EventSchema = new mongoose.Schema({
    name: String,
    description: String,
    location: String,
    date: String
});
const Event = mongoose.model('Event', EventSchema);

// Schema for bookings
const BookingSchema = new mongoose.Schema({
    name: String,
    email: String,
    date: String,
    guests: Number,
    event: String
});
const Booking = mongoose.model('Booking', BookingSchema);

// API Routes

// Bookings Route
app.post('/api/bookings', (req, res) => {
    const { name, email, date, guests, event } = req.body;

    if (!name || !email || !date || !guests || !event) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const newBooking = new Booking(req.body);
    newBooking.save()
        .then(() => res.status(200).json({ message: 'Booking successful!' }))
        .catch(err => res.status(500).json({ message: 'Error saving booking', error: err }));
});

// Get all bookings
app.get('/api/bookings', (req, res) => {
    Booking.find()
        .then(bookings => res.status(200).json(bookings))
        .catch(err => res.status(500).json({ message: 'Error fetching bookings', error: err }));
});

// Events Route
app.get('/api/events', (req, res) => {
    Event.find()
        .then(events => res.status(200).json(events))
        .catch(err => res.status(500).json({ message: 'Error fetching events', error: err }));
});

// Add new event
app.post('/api/events', (req, res) => {
    const { name, description, location, date } = req.body;

    if (!name || !description || !location || !date) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const newEvent = new Event(req.body);
    newEvent.save()
        .then(() => res.status(200).json({ message: 'Event added successfully!' }))
        .catch(err => res.status(500).json({ message: 'Error adding event', error: err }));
});

// Serve static pages
app.get('/', (req, res) => res.sendFile(__dirname + '/public/index.html'));
app.get('/about', (req, res) => res.sendFile(__dirname + '/public/about.html'));
app.get('/gateway', (req, res) => res.sendFile(__dirname + '/public/gateway.html'));
app.get('/budget', (req, res) => res.sendFile(__dirname + '/public/budget.html'));
app.get('/weather', (req, res) => res.sendFile(__dirname + '/public/weather.html'));

// Middleware for Weather API
app.get('/api/weather', (req, res) => {
    const city = req.query.city; // Get the city from query parameters
    const apiKey = 'fb006febe0914f5d466c6534bfb66033'; // Replace with your OpenWeatherMap API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    // Forward the request to the OpenWeatherMap API using axios
    axios.get(url)
        .then(response => {
            res.json(response.data); // Send the parsed response back to the client
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            res.status(500).send('Error fetching weather data'); // Send error if request fails
        });
});
// 404 Error Handling
app.use((req, res, next) => {
    res.status(404).json({ message: 'Page not found' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
