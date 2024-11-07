import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedVideo } from '@cloudinary/react';
import styles from "./OurStory.module.css";

const OurStory = () => {
  // Initialize Cloudinary instance with your cloudName
  const cld = new Cloudinary({
    cloud: {
      cloudName: 'dwenvtwyx', // Replace with your cloud name
    },
  });

  // Fetch the video by its public ID
  const video = cld.video('Podium_be5hn5'); // Replace with the public ID of your video

  return (
    <div>
      {/* AdvancedVideo component for optimized Cloudinary video */}
      <AdvancedVideo cldVid={video} loop autoPlay muted controls={false} />
      <div className={styles.overlay}>
        <div className={styles.epigraph}>
          <p> {/* Your text content goes here */} </p>
        </div>
      </div>
    </div>
  );
};

export default OurStory;