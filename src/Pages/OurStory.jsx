import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedVideo } from '@cloudinary/react';
import { useState } from 'react';
import styles from "./OurStory.module.css";
import Review from '../../components/Review';
import SubmitModal from '../../components/SubmitModal';

const OurStory = () => {
  // Initialize Cloudinary instance with your cloudName
  const cld = new Cloudinary({
    cloud: {
      cloudName: 'dwenvtwyx',
    },
  });

  // Fetch the video by its public ID
  const video = cld.video('Podium_be5hn5');

  // State to manage the modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to open the modal
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      {/* Video Element */}
      <div className={styles.videoContainer}>
        <AdvancedVideo cldVid={video} loop autoPlay muted controls={false} />
      </div>

      {/* Full-Screen Image Immediately After Video */}
      <div className={styles.imageContainer}>
        <img
          src="/src/assets/green.png"
          alt="Fashion Podium"
          className={styles.fullScreenImage}
        />
      </div>

      {/* Clickable Link with Fashion Network Logo */}
      <a
        href="https://de.fashionnetwork.com/fotogalerien/photos/Varona-by-Nataliya-Rodionova,33328.html"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          className={styles.fashionNetwork}
          src="/src/assets/fashion-network-logo.webp"
          alt="Fashion Podium"
        />
      </a>

      {/* Additional Images */}
      {['impermiabile.png', 'abito.png', 'sarafan.png', 'pantaloni.png', 'trasparente.png'].map((image, index) => (
        <div className={styles.imageContainer} key={index}>
          <img
            src={`/src/assets/${image}`}
            alt={`Fashion Podium ${index}`}
            className={styles.fullScreenImage}
          />
        </div>
      ))}

      {/* Overlay Section (Modal and Review) */}
      <div className={styles.overlay}>
        {/* SubmitModal will open only when handleOpenModal is called */}
        {isModalOpen && <SubmitModal onClose={handleCloseModal} />}
        {/* Pass handleOpenModal to Review so it opens the modal on form submission */}
        <Review onSubmit={handleOpenModal} />
      </div>
    </div>
  );
};

export default OurStory;
