import { useState } from "react";
import { FaStar } from "react-icons/fa";
import "../components/Review.css";

const Review = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);
  const [message, setMessage] = useState("");
  const [image, setImage] = useState(null);
  const [reviews, setReviews] = useState([]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating && message) {
      const newReview = {
        rating,
        message,
        image,
      };
      setReviews([newReview, ...reviews]);
      setRating(0);
      setHover(null);
      setMessage("");
      setImage(null);
    } else {
      alert("Please provide a rating and a review message.");
    }
  };

  return (
    <div className="review-component">
      <form onSubmit={handleSubmit} className="review-form">
        <h2>Leave a Review</h2>

        {/* Image Upload */}
        <label className="image-upload">
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {image && <img src={image} alt="Review" className="preview-img" />}
        </label>

        {/* Star Rating */}
        <div className="star-rating">
          {[...Array(5)].map((_, index) => {
            const ratingValue = index + 1;
            return (
              <label key={index}>
                <input
                  className="radio"
                  type="radio"
                  name="rating"
                  value={ratingValue}
                  onClick={() => setRating(ratingValue)}
                />
                <FaStar
                  className="star"
                  color={
                    ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"
                  }
                  size={20}
                  onMouseEnter={() => setHover(ratingValue)}
                  onMouseLeave={() => setHover(null)}
                />
              </label>
            );
          })}
        </div>

        {/* Message */}
        <textarea
          placeholder="Write your review..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        ></textarea>

        {/* Submit Button */}
        <button type="submit">Submit Review</button>
      </form>

      {/* Display Reviews */}
      <div className="reviews-list">
        {reviews.map((review, index) => (
          <div key={index} className="review-item">
            {review.image && (
              <img src={review.image} alt="User" className="review-img" />
            )}
            <div className="review-content">
              <div className="review-stars">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    color={i < review.rating ? "#ffc107" : "#e4e5e9"}
                    size={20}
                  />
                ))}
              </div>
              <p className="review-message">{review.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Review;