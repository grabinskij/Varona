import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import styles from "./SubmitModal.module.css";

const SubmitModal = ({ onClose }) => {
  return (
    <div className={styles.submitModal}>
      <img className={styles.adesivo} src="/src/assets/adesivo.png" alt="Sticker" />
      <div className={styles.header}>
        <h3 style={{ textAlign: "center" }}>Thank you!</h3>
        {/* Close Icon */}
        <FontAwesomeIcon icon={faTimes} className={styles.closeIcon} onClick={onClose} />
      </div>
      <div className={styles.itemList}>
        <div className={styles.item}>
          <p>We truly appreciate the time you took to share your experience with us.</p>
          {/* Close Button */}
          <button onClick={onClose} style={{ backgroundColor: "white", color: "black", marginBottom: "70px" }}>
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubmitModal;
