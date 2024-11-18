const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();

// Load environment variables from .env file
dotenv.config();

// Check if the required environment variables are loaded
const { MONGO_URI, PORT, FRONTEND_URL_LOCAL, FRONTEND_URL_PROD } = process.env;
if (!MONGO_URI) {
    console.error('MongoDB URI is missing. Please check your .env file.');
    process.exit(1);
}

if (!PORT) {
    console.error('PORT is missing. Please check your .env file.');
    process.exit(1);
}

if (!FRONTEND_URL_LOCAL || !FRONTEND_URL_PROD) {
    console.error('Frontend URLs are missing. Please check your .env file.');
    process.exit(1);
}

// Middleware to parse JSON data
app.use(express.json());

// Enable CORS for both development and production environments
const corsOptions = {
    origin: process.env.NODE_ENV === 'production' ? FRONTEND_URL_PROD : FRONTEND_URL_LOCAL, // Conditionally set the allowed frontend URL
    methods: ['GET', 'POST'], // Specify allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow specific headers
    credentials: true, // Enable credentials (cookies, authorization headers, etc.)
};
app.use(cors(corsOptions));

// Import the database connection and establish the connection
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB successfully'))
    .catch((err) => {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    });

// Import the User model
const User = require('./Models/User');

// POST route to save a new user (form submission endpoint)
app.post('/api/submit', async (req, res) => {
    try {
        const { name, surname, email, message, terms } = req.body;

        // Validate required fields
        if (!name || !surname || !email || !message || terms !== 'yes') {
            return res.status(400).json({ error: 'All fields are required and terms must be accepted.' });
        }

        // Save the form data to MongoDB
        const user = new User(req.body);
        const result = await user.save();
        res.status(201).json({ message: 'Form submitted successfully', data: result });
    } catch (error) {
        console.error('Error saving user:', error);
        res.status(500).json({ error: 'Error saving data' });
    }
});

// Catch-all route for 404 errors (move it to the end)
app.use((req, res) => {
    res.status(404).json({ error: 'Endpoint not found' });
});

// Global error handler middleware (move it to the end)
app.use((err, req, res, next) => {
    console.error('Server error:', err);
    res.status(500).json({ error: 'Internal server error' });
});

// Start the server
const server = app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// Graceful shutdown on termination
process.on('SIGINT', () => {
    server.close(() => {
        console.log('Server shut down gracefully');
        mongoose.connection.close();
    });
});
