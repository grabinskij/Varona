import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import styles from "./SubmitModal.module.css";

const SubmitModal = ({ onClose }) => {

  return (
      <div className={styles.submitModal}>
          <img className={styles.adesivo} src="/src/assets/adesivo.png" alt="" />
      <div className={styles.header}>
        <h3 style={{textAlign: "center"}}>Thank you!</h3>
        <FontAwesomeIcon icon={faTimes} className={styles.closeIcon} onClick={onClose} />
      </div>
      <div className={styles.itemList}>
    
          <div className={styles.item}>
            <p>Form submitted successfully!</p>
            <button onClick={onClose} style={{backgroundColor:"white", color: "black"}}>OK</button>
          </div>
      </div>
    </div>
  );
};

export default SubmitModal;