import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedVideo } from '@cloudinary/react';
import { useState, useEffect } from 'react';
import styles from "./OurStory.module.css";
import Review from '../../components/Review';
import SubmitModal from '../../components/SubmitModal';
import { FaStar } from 'react-icons/fa';

const OurStory = () => {
  const [error, setError] = useState(null); // State for error messages
  const [reviews, setReviews] = useState([]); // Approved reviews state
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state

  // Initialize Cloudinary instance
  const cld = new Cloudinary({
    cloud: {
      cloudName: 'dwenvtwyx',
    },
  });

  // Fetch reviews from API
  const fetchApprovedReviews = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/reviews', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const allReviews = await response.json();
        const approvedReviews = allReviews.filter((review) => review.isApproved); // Filter only approved reviews
        setReviews(approvedReviews);
      } else {
        throw new Error('Failed to fetch reviews');
      }
    } catch (error) {
      console.error(error);
      setError('Error fetching reviews. Please try again later.');
    }
  };

  useEffect(() => {
    fetchApprovedReviews(); // Fetch reviews when component loads
  }, []);

  // Open modal
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  // Close modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Cloudinary video setup
  const video = cld.video('Podium_be5hn5');
  const logo = cld.image('fashion-network-logo_apwgif').format('webp').quality(80);
  const imagePublicIds = [
    'green_cev8bm',
    'capotto_iaam9k',
    'pantaloni_loyblc',
    'impermiabile_agbvg3',
    'abito_h4xf2u',
  ];

  return (
    <div>
      {/* Video Section */}
      <div className={styles.videoContainer}>
        <AdvancedVideo cldVid={video} loop autoPlay muted controls={false} />
      </div>

      {/* Logo Section */}
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

      {/* Image Gallery */}
      <div className={styles.imageGallery}>
        {imagePublicIds.map((imageId, index) => {
          const image = cld.image(imageId).format('webp').quality(80);
          return (
            <div className={styles.imageContainer} key={index}>
              <img
                src={image.toURL()}
                alt={`Gallery Image ${index}`}
                className={styles.fullScreenImage}
              />
            </div>
          );
        })}
      </div>

      {/* Client Reviews Section */}
      <section className={styles.review}>
        <h1 style={{ color: 'black' }}>What Our Clients Say:</h1>
        <div className={styles.reviewsList}>
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
      </section>

      {/* Review Submission Section */}
      <div className={styles.overlay}>
        {/* SubmitModal */}
        {isModalOpen && <SubmitModal onClose={handleCloseModal} />}
        {/* Review Form */}
        <Review 
          onSubmit={handleOpenModal} // Open modal after submission
          setError={setError} // Pass error handler
          setReviews={fetchApprovedReviews} // Refresh approved reviews after submission
        />
      </div>
    </div>
  );
};

export default OurStory;
