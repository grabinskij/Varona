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
  const [error, setError] = useState("");

  const getApiUrl = () => {
    if (process.env.NODE_ENV === "production") {
      return "https://www.nataliyarodionova.com/api/reviews";
    }
    return "http://localhost:4000/api/reviews";
  };

  const handleCloseModal = () => setIsModalOpen(false);

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

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setReviewFields((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleRatingClick = (ratingValue) => {
    setReviewFields((prevState) => ({
      ...prevState,
      rating: ratingValue,
    }));
  };

  const fetchApprovedReviews = async () => {
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
        // Filter reviews by approval status
        const approvedReviews = reviewsData.filter((review) => review.isApproved);
        setReviews(approvedReviews);
      } else {
        setError("Failed to fetch reviews");
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
      setError("Error fetching reviews");
    }
  };

  useEffect(() => {
    fetchApprovedReviews();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, rating, message } = reviewFields;

    if (!name.trim() || !rating || !message.trim()) {
      alert("Please provide your name, a rating, and a review message.");
      return;
    }

    const data = { ...reviewFields };

    try {
      const response = await fetch(getApiUrl(), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
      });

      if (response.ok) {
        setReviewFields({ name: "", rating: 0, message: "", image: null });
        setHover(null);
        setIsModalOpen(true);
      } else {
        const errorData = await response.json();
        console.error("Error response from server:", errorData);
        alert(errorData.error || "There was an error submitting the review.");
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

        <input
          type="text"
          name="name"
          placeholder="Your name..."
          value={reviewFields.name}
          onChange={handleOnChange}
          required
          className={styles.input}
        />

        <label className={styles.imageUpload}>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {reviewFields.image && (
            <img src={reviewFields.image} alt="Review" className={styles.previewImg} />
          )}
        </label>

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

        <textarea
          placeholder="Write your review..."
          name="message"
          value={reviewFields.message}
          onChange={handleOnChange}
          required
          className={styles.textArea}
        ></textarea>

        <button type="submit" className={styles.button}>
          Submit Review
        </button>
      </form>

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

      {isModalOpen && <SubmitModal onClose={handleCloseModal} />}
    </div>
  );
};

export default Review;
