import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedVideo } from '@cloudinary/react';
import styles from "./OurStory.module.css";
import Review from '../../components/Review';

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
      {/* Video Element */}
      <AdvancedVideo cldVid={video} loop autoPlay muted controls={false} />
      
      {/* Overlay Section */}
      <div className={styles.overlay}>
        <Review />
      </div>
      <div>
      </div>
        <img 
            src="https://your-image-url-here.jpg" 
            alt="Description of the image" 
            className={styles.image} 
          />
    </div>
    
  );
};

export default OurStory;