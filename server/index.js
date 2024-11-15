const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();

// Load environment variables from .env file
dotenv.config();

// Check if the required environment variables are loaded
const { MONGO_URI, PORT, FRONTEND_URL } = process.env;
if (!MONGO_URI) {
    console.error('MongoDB URI is missing. Please check your .env file.');
    process.exit(1); // Exit if Mongo URI is not provided
}

if (!PORT) {
    console.error('PORT is missing. Please check your .env file.');
    process.exit(1); // Exit if PORT is not provided
}

if (!FRONTEND_URL) {
    console.error('Frontend URL is missing. Please check your .env file.');
    process.exit(1); // Exit if FRONTEND_URL is not provided
}

// Middleware to parse JSON data
app.use(express.json());

// Enable CORS for all origins (you can specify a specific origin for better security)
const corsOptions = {
    origin: FRONTEND_URL || 'http://localhost:5173', // Allow frontend URL from env
    methods: 'POST', // Allow specific methods
    allowedHeaders: 'Content-Type,Authorization',// Allow certain headers
};
app.use(cors(corsOptions));

// Import the database connection and establish the connection
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB successfully'))
    .catch((err) => {
        console.error('MongoDB connection error:', err);
        process.exit(1); // Exit the server if connection fails
    });

// Import the User model
const User = require('./Models/User');

// POST route to save a new user
app.post('/api/users', async (req, res) => {
    try {
        const user = new User(req.body);
        const result = await user.save();
        res.status(201).json({ message: 'User created successfully', data: result });
    } catch (error) {
        console.error('Error saving user:', error);
        res.status(400).json({ error: error.message });
    }
});

// Catch-all route for 404 errors
app.use((req, res) => {
    res.status(404).json({ error: 'Endpoint not found' });
});

// Global error handler middleware
app.use((err, req, res, next) => {
    console.error('Server error:', err);
    res.status(500).json({ error: 'Internal server error' });
});

// Start the server with a callback for confirmation
const server = app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// Graceful shutdown on termination (optional but recommended)
process.on('SIGINT', () => {
    server.close(() => {
        console.log('Server shut down gracefully');
        mongoose.connection.close();
    });
});