import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedVideo } from "@cloudinary/react";
import { useEffect, useState } from "react";
import styles from "./OurStory.module.css";
import Review from "../../components/Review";
import SubmitModal from "../../components/SubmitModal";
import { FaStar } from "react-icons/fa";

const OurStory = () => {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const cld = new Cloudinary({
    cloud: {
      cloudName: "dwenvtwyx",
    },
  });

  const video = cld.video("Podium_be5hn5");
  const logo = cld.image("fashion-network-logo_apwgif").format("webp").quality(80);

  const imagePublicIds = [
    "green_cev8bm",
    "capotto_iaam9k",
    "pantaloni_loyblc",
    "impermiabile_agbvg3",
    "abito_h4xf2u",
  ];

  const getApiUrl = () => {
    if (process.env.NODE_ENV === "production") {
      return "https://www.nataliyarodionova.com/api/reviews";
    }
    return "http://localhost:4000/api/reviews";
  };

  const fetchApprovedReviews = async () => {
    try {
      const response = await fetch(getApiUrl(), {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        const data = await response.json();
        setReviews(data.filter((review) => review.approved)); // Only display approved reviews
      } else {
        setError("Failed to load reviews.");
      }
    } catch (err) {
      setError("Error fetching reviews.");
    }
  };

  useEffect(() => {
    fetchApprovedReviews();
  }, []);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div>
      <div className={styles.videoContainer}>
        <AdvancedVideo cldVid={video} loop autoPlay muted controls={false} />
      </div>
      <a
        href="https://de.fashionnetwork.com/fotogalerien/photos/Varona-by-Nataliya-Rodionova,33328.html"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          className={styles.fashionNetwork}
          src={logo.toURL()}
          alt="Fashion Podium"
        />
      </a>
      <div className={styles.imageGallery}>
        {imagePublicIds.map((id, index) => (
          <div className={styles.imageContainer} key={index}>
            <img
              src={cld.image(id).format("webp").quality(80).toURL()}
              alt={`Gallery ${index}`}
              className={styles.fullScreenImage}
            />
          </div>
        ))}
      </div>
      <section className={styles.review}>
        <h1 style={{ color: "black" }}>What our client says:</h1>
        {error && <div className={styles.error}>{error}</div>}
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
              <img src={review.image} alt="Review" className={styles.reviewImg} />
            )}
            <p className={styles.reviewMessage}>{review.message}</p>
            <span className={styles.reviewDate}>
              {new Date(review.createdAt).toLocaleDateString()}
            </span>
          </div>
        ))}
      </section>
      <div className={styles.overlay}>
        {isModalOpen && <SubmitModal onClose={handleCloseModal} />}
        <Review onSubmit={handleOpenModal} />
      </div>
    </div>
  );
};

export default OurStory;
