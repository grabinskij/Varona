import styles from "./Form.module.css";
import { useState } from "react";

const Form = () => {
  const [formFields, setFormFields] = useState({
    name: "",
    surname: "",
    email: "",
    country: "",
    message: "",
    terms: "", // Ensure terms is set to an empty string initially
  });

  const fullWidthStyles = [styles.inputWrapper, styles.fullWidth].join(" ");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = { ...formFields };



    console.log(data);

    // Example of submitting the form data to a server using fetch (optional)
    try {
      const response = await fetch("http://localhost:4000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert("Form submitted successfully!");
        setFormFields({
        name: "",
        surname: "",
        email: "",
        country: "",
        message: "",
        terms: "", // Reset terms as well
        });
        
      } else {
        alert("There was an error submitting the form.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("There was a network error.");
    }
  };

  const handleOnChange = (event) => {
    setFormFields((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  // Check if the form is valid (all fields must be filled, and terms must be accepted)
  const isFormValid =
    formFields.name &&
    formFields.surname &&
    formFields.email &&
    formFields.message && // Ensure the message field is included
    formFields.terms === "yes"; // Make sure 'terms' is explicitly set to 'yes'

  return (
    <>
      <div className={styles.wrapper}>
        <h1 className={styles.header}>Contact Us:</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputWrapperRow}>
            <div className={styles.inputItem}>
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formFields.name}
                onChange={handleOnChange}
                required
              />
            </div>
            <div className={styles.inputItem}>
              <label htmlFor="surname">Surname:</label>
              <input
                type="text"
                id="surname"
                name="surname"
                value={formFields.surname}
                onChange={handleOnChange}
                required
              />
            </div>
          </div>
          <div className={styles.inputWrapper}>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formFields.email}
              onChange={handleOnChange}
              required
            />
          </div>
          <div className={fullWidthStyles}>
            <label htmlFor="message">Message:</label>
            <textarea
              id="message"
              name="message"
              rows="4"
              value={formFields.message}
              onChange={handleOnChange}
              required
            />
          </div>
          <div className={fullWidthStyles}>
            <legend style={{ color: 'grey', fontWeight: '200' }}>
              Do you agree to the terms?
            </legend>
            <div className={styles.radioGroup}>
              <label>
                <input
                  type="radio"
                  name="terms"
                  value="yes"
                  checked={formFields.terms === "yes"}
                  onChange={handleOnChange}
                />{" "}
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  name="terms"
                  value="no"
                  checked={formFields.terms === "no"}
                  onChange={handleOnChange}
                />{" "}
                No
              </label>
            </div>
          </div>
          <div>
            <button
              className={styles.button}
              type="submit"
              disabled={!isFormValid} // Disable the button if form is invalid
            >
              Submit
            </button>

            <div className={styles.textArea}>
              <p style={{ fontStyle: "italic", fontFamily: "monospace" }}>
                We will respond to every email within 24 hours, from Monday to Saturday.
              </p>

              <p style={{ fontStyle: "italic", fontFamily: "monospace" }}>
                You can also call us at our toll-free number:{" "}
                <a
                  href="tel:+4917620652851"
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  017620652851
                </a>{" "}
                - from 9AM to 9PM EST Monday to Friday, and 10AM to 9PM EST on Saturday.
              </p>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Form;