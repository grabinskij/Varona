const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    rating: { type: Number, required: true },
    message: { type: String, required: true },
    image: { type: String },
}, { timestamps: true }); // Add timestamps to track creation and update times

module.exports = mongoose.model('Review', reviewSchema);
