import styles from "./Review.module.css";
import { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import SubmitModal from "./SubmitModal";

const Review = () => {
  const [reviewFields, setReviewFields] = useState({
    name: "",
    rating: 0,
    message: "",
    image: null,
  });

  const [reviews, setReviews] = useState([]);
  const [hover, setHover] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState(""); // Add error state to handle errors

  // Function to get the correct API endpoint based on environment
  const getApiUrl = () => {
    if (process.env.NODE_ENV === "production") {
      return "https://www.nataliyarodionova.com/api/reviews"; // Production URL
    }
    return "http://localhost:4000/api/reviews"; // Local development URL
  };

  // Function to handle closing the modal
  const handleCloseModal = () => setIsModalOpen(false);

  // Function to handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setReviewFields((prevState) => ({
          ...prevState,
          image: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Function to handle input changes for rating and message
  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setReviewFields((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle rating click
  const handleRatingClick = (ratingValue) => {
    setReviewFields((prevState) => ({
      ...prevState,
      rating: ratingValue,
    }));
  };

  // Function to fetch existing reviews
  const fetchReviews = async () => {
    try {
      const response = await fetch(getApiUrl(), {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (response.ok) {
        const reviewsData = await response.json();
        setReviews(reviewsData);
      } else {
        setError("Failed to fetch reviews"); // Set error message if fetching fails
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
      setError("Error fetching reviews"); // Set error message in case of network failure
    }
  };

  // Fetch reviews on component mount
  useEffect(() => {
    fetchReviews();
  }, []);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { ...reviewFields };

    // Check if rating and message are provided
    if (!data.rating || !data.message.trim()) {
      alert("Please provide a rating and a review message.");
      return;
    }

    console.log("Submitting review:", data);

    try {
      const response = await fetch(getApiUrl(), {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Ensure the correct header is set
        },
        body: JSON.stringify(data),
        credentials: "include", // Ensure cookies are sent if needed
      });

      if (response.ok) {
        const result = await response.json();

        // Add new review to the state and reset form fields
        setReviews([result.data, ...reviews]);
        setReviewFields({ rating: 0, message: "", image: null });
        setHover(null);
        setIsModalOpen(true); // Open the success modal
      } else {
        const errorData = await response.json();
        console.error("Error response from server:", errorData);
        alert("There was an error submitting the review.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to submit the review. Please try again.");
    }
  };

  return (
    <div className={styles.reviewComponent}>
      <form onSubmit={handleSubmit} className={styles.reviewForm}>
        <h2>Leave a Review</h2>

        {/* Image Upload */}
        <label className={styles.imageUpload}>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {reviewFields.image && (
            <img src={reviewFields.image} alt="Review" className={styles.previewImg} />
          )}
        </label>

        {/* Star Rating */}
        <div className={styles.starRating}>
          {[...Array(5)].map((_, index) => {
            const ratingValue = index + 1;
            return (
              <label key={index}>
                <input
                  className={styles.radio}
                  type="radio"
                  name="rating"
                  value={ratingValue}
                  onClick={() => handleRatingClick(ratingValue)}
                />
                <FaStar
                  className={styles.star}
                  color={ratingValue <= (hover || reviewFields.rating) ? "#ffc107" : "#e4e5e9"}
                  size={20}
                  onMouseEnter={() => setHover(ratingValue)}
                  onMouseLeave={() => setHover(null)}
                />
              </label>
            );
          })}
        </div>
        <input type="text" name="" id=""
         placeholder="Your name.."/>
        {/* Message */}
        <textarea
          placeholder="Write your review..."
          name="message"
          value={reviewFields.message}
          onChange={handleOnChange}
          required
          className={styles.textArea}
        ></textarea>

        {/* Submit Button */}
        <button type="submit" className={styles.button}>
          Submit Review
        </button>
      </form>

      {/* Display Reviews */}
      <div className={styles.reviewsList}>
        {reviews.map((review) => (
          <div key={review._id} className={styles.reviewItem}>
            <div className={styles.reviewHeader}>
              <span className={styles.reviewerName}>{review.name}</span>
              <div className={styles.reviewStars}>
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    color={i < review.rating ? "#ffc107" : "#e4e5e9"}
                    size={20}
                  />
                ))}
              </div>
            </div>
            {review.image && (
              <img
                src={review.image}
                alt="Review"
                className={styles.reviewImg}
              />
            )}
            <p className={styles.reviewMessage}>{review.message}</p>
            <span className={styles.reviewDate}>
              {new Date(review.createdAt).toLocaleDateString()}
            </span>
          </div>
        ))}
      </div>

      {/* Submit Modal */}
      {isModalOpen && <SubmitModal onClose={handleCloseModal} />}
    </div>
  );
};

export default Review;
