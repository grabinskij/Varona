const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();

// Load environment variables from .env file
dotenv.config();

// Check if the required environment variables are loaded
const { MONGO_URI, PORT, FRONTEND_URL_LOCAL, FRONTEND_URL_PROD, NODE_ENV } = process.env;

// Validate environment variables
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

// Set default value for NODE_ENV if not specified
const environment = NODE_ENV || 'development';

// Middleware to parse JSON data
app.use(express.json());

// Enable CORS based on environment
const allowedOrigins = [FRONTEND_URL_LOCAL, FRONTEND_URL_PROD];
const corsOptions = {
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps, Postman, etc.)
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
};
app.use(cors(corsOptions));


// Connect to MongoDB
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected to MongoDB successfully'))
    .catch((err) => {
        console.error('MongoDB connection error:', err.message);
        process.exit(1);
    });

// Import models
const User = require('./Models/User');
const Review = require('./Models/Review');

// Route: POST /api/submit - Save a new user
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
        console.error('Error saving user:', error.message);
        res.status(500).json({ error: 'Error saving user data' });
    }
});

app.post('/api/reviews', async (req, res) => {
    try {
        const { rating, message, image } = req.body;

        // Validate the fields
        if (!rating || !message || rating < 1 || rating > 5 || message.trim().length < 1) {
            return res.status(400).json({ error: 'Rating (1-5) and a message are required.' });
        }

        // Create a new review document
        const newReview = new Review({ rating, message, image });
        const savedReview = await newReview.save();

        res.status(201).json({ message: 'Review submitted successfully', data: savedReview });
    } catch (error) {
        console.error('Error submitting review:', error.message);
        if (error.name === 'ValidationError') {
            res.status(400).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Failed to submit review' });
        }
    }
});

// Route: GET /api/reviews - Fetch all reviews
app.get('/api/reviews', async (req, res) => {
    try {
        const reviews = await Review.find().sort({ createdAt: -1 });
        res.status(200).json(reviews);
    } catch (error) {
        console.error('Error fetching reviews:', error.message);
        res.status(500).json({ error: 'Failed to fetch reviews' });
    }
});

// Catch-all route for 404 errors
app.use((req, res) => {
    res.status(404).json({ error: 'Endpoint not found' });
});

// Global error handler middleware
app.use((err, req, res, next) => {
    console.error('Server error:', err.message);
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
