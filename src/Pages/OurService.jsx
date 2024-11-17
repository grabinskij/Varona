import { useState } from "react";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage } from "@cloudinary/react";
import { auto } from "@cloudinary/url-gen/actions/resize";
import { autoGravity } from "@cloudinary/url-gen/qualifiers/gravity";
import styles from "./OurService.module.css";


const cld = new Cloudinary({
  cloud: {
    cloudName: "dwenvtwyx",
  },
});

const OurService = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const getImage = (imageId) =>
    cld
      .image(imageId)
      .format("auto")
      .quality("auto")
      .resize(auto().gravity(autoGravity()).width(500).height(500));

  const getFullSizeUrl = (imageId) =>
    `https://res.cloudinary.com/dwenvtwyx/image/upload/${imageId}.jpg`;

  const openImageModal = (imageId) => {
    setSelectedImage(getFullSizeUrl(imageId));
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className={styles.ordnung}>
      <section>
        <div
          onClick={() =>
            openImageModal(
              "66130675_2309445942483047_864015165027254272_n_5_bmvvjh"
            )
          }
        >
          <AdvancedImage className={styles.fullWidthImage}
            cldImg={getImage(
              "66130675_2309445942483047_864015165027254272_n_5_bmvvjh"
            )}
            alt="Viola"
          />
        </div>
      </section>

      <section className={styles.sectionStyle}>
        <div className={styles.textContainer}>
          <h1>Our Mission:</h1>
          <p>
            Welcome to VARONA, where elegance meets poetry in the realm of
            Fashion. Inspired by the graceful allure of crows, our brand crafts
            sophisticated wardrobe essentials and accessories for both men and
            women from the finest Italian wool and cashmere. In shades of grey,
            white, and black, VARONA embodies a captivating amalgamation of
            refinement and lyrical resonance. Explore our collection and embrace
            the timeless charm that defines VARONA - where every piece tells a
            story, and style becomes a poetic manifestation of uniqueness.
          </p>
        </div>
      </section>

      <section>
        <div
          onClick={() => openImageModal("TEST-Steve-Muliett0867_B-1_fnxrq7")}
        >
          <AdvancedImage className={styles.fullWidthImage}
            cldImg={getImage("TEST-Steve-Muliett0867_B-1_fnxrq7")}
            alt="Woolen"
          />
        </div>
      </section>

      <section className={styles.sectionMission}>
        <div className={styles.textContainer}>
          <h1>Our Style:</h1>
          <p>
            Our mission is more than just creating handmade knitwear.
            Recognizing the uniqueness of each client, our approach is far from
            one-size-fits-all. We take the time to understand, adapt, and create
            bespoke pieces that resonate with your individual style. We set the
            highest standards, ensuring every piece is a testament to quality,
            personalized service, and guarantees of satisfaction. Your trust is
            our most cherished possession. Beyond transactions, Varona is a
            haven of care and warmth. We build relationships, providing
            personalized attention to ensure you feel embraced throughout your
            journey with us.
          </p>
        </div>
      </section>

      <section>
        <div
          onClick={() =>
            openImageModal("Screenshot_from_2024-02-05_16-30-14_1_kzdw21")
          }
        >
          <AdvancedImage className={styles.fullWidthImage}
            cldImg={getImage("Screenshot_from_2024-02-05_16-30-14_1_kzdw21")}
            alt="Couple"
          />
        </div>
      </section>

      <section className={styles.sectionMaterials}>
        <div className={styles.textContainer}>
          <h1>Materials:</h1>
          <p>
            Welcome to VARONA, where elegance meets poetry in the realm of
            Fashion. Inspired by the graceful allure of crows, our brand crafts
            sophisticated wardrobe essentials and accessories for both men and
            women from the finest Italian wool and cashmere. In shades of grey,
            white, and black, VARONA embodies a captivating amalgamation of
            refinement and lyrical resonance. Explore our collection and embrace
            the timeless charm that defines VARONA - where every piece tells a
            story, and style becomes a poetic manifestation of uniqueness.
          </p>
        </div>
      </section>

      <section>
        <div onClick={() => openImageModal("sommer_xjiitv")}>
          <AdvancedImage className={styles.fullWidthImage} cldImg={getImage("sommer_xjiitv")} alt="Sommer" />
        </div>
      </section>

      <section className={styles.sectionService}>
        <div className={styles.textContainer}>
          <h1>Our Concept:</h1>
          <p>
            Varona is more than a brand; It's an embodiment of elegance, a
            fusion of mystery, and a celebration of timeless shades like black,
            grey, and white. Founded by Nataliya Rodionova, Varona originated
            from the creative depths cultivated during her education at a
            sartorial school in Ukraine and Istituto Marangoni in Milan.
          </p>
        </div>
      </section>

      <section className={styles.miaLogoContainer}>
        <div onClick={() => openImageModal("IMG_2624_qepkei")}>
          <AdvancedImage className={styles.fullWidthImage}
            cldImg={getImage("IMG_2624_qepkei")}
            alt="Miale Journal"
          />
         <AdvancedImage className={styles.miaLogo}
            cldImg={getImage("MIALEJOURNAL_BLACK_rwcikd")}
            alt="Miale Journal"
          />
          </div>
      </section>

      <section className={styles.sectionService}>
        <div className={styles.textContainer}>
          <h1>Our Service:</h1>
          <p>
            We specialize in creating exclusive, handmade items and accessories
            tailored for both men and women. Using only premium natural
            materials, we're here to turn your boldest visions into reality.
          </p>
        </div>
      </section>

      <section>
        <div onClick={() => openImageModal("revista-YBLx2HXM_ji0z8f")}>
          <AdvancedImage className={styles.fullWidthImage}
            
            cldImg={getImage("revista-YBLx2HXM_ji0z8f")}
          />
        </div>
      </section>

      <section className={styles.sectionCustomers}>
        <div className={styles.textContainer}>
          <h1>Our Customers:</h1>
          <p>
            We specialize in creating exclusive, handmade items and accessories
            tailored for both men and women. Using only premium natural
            materials, we're here to turn your boldest visions into reality.
          </p>
        </div>
      </section>

      <section>
        <div onClick={() => openImageModal("undrogin_x7ql7r")}>
          <AdvancedImage
            className={styles.fullWidthImage}
            cldImg={getImage("undrogin_x7ql7r")}
          />
        </div>
      </section>

      <section className={styles.sectionCustomers}>
        <div className={styles.textContainer}>
          <h1>Our Customers:</h1>
          <p>
            We specialize in creating exclusive, handmade items and accessories
            tailored for both men and women. Using only premium natural
            materials, we're here to turn your boldest visions into reality.
          </p>
        </div>
      </section>

      <section>
        <div onClick={() => openImageModal("image_6487327_hr1zra")}>
          <AdvancedImage
            style={{ transform: 'scale(1.1)'}}
            cldImg={getImage("image_6487327_hr1zra")}
            alt="Bissiol"
          />
        </div>
      </section>

      {selectedImage && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.modalContent}>
            <button className={styles.closeButton} onClick={closeModal}>
              X
            </button>
            <img
              src={selectedImage}
              alt="Full-size view"
              className={styles.fullSizeImage}
            />
          </div>
        </div>
      )}
 
    </div>
  );
};

export default OurService;
