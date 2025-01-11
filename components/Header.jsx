import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "./Nav";
import logo from "../src/assets/Logo.webp";
import styles from "./Header.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faUser, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import CartSummary from "./CartSummary";
import { useCart } from "./CartContext";

const Header = () => {
  const navigate = useNavigate();
  const [cartIsOpen, setCartIsOpen] = useState(false);
  const [menu, openMenu] = useState(false);
  const { cartItems } = useCart();

  // Check if we're on the Contacts page
  const isContactPage = window.location.pathname === "/contacts";

  const handleCartClick = () => {
    setCartIsOpen(!cartIsOpen);
  };

  const toggleMenu = () => {
    if (isContactPage) {
      openMenu(!menu); // Open modal-style menu on Contacts page
    } else {
      openMenu(!menu); // Open regular menu on other pages
    }
  };

  return (
    <Nav>
      <div className={`${styles.navigation} ${isContactPage ? styles.blackBackground : ''}`}>
        {/* Logo on the left */}
        <div onClick={() => navigate("/")} className={styles.logo}>
          <img 
            className={`${styles.logotype} ${isContactPage ? styles.whiteLogo : ''}`} 
            src={logo} 
            alt="Logo" 
          />
        </div>
        
        <div className={styles.navbar}>
          <ul className={styles.navLinks}>
            {["/ourstory", "/ourservice", "/shop", "/contacts"].map((path, index) => {
              const label = path.slice(1).toUpperCase().replace(/_/g, ' ');
              return (
                <li key={index} className={isContactPage ? styles.whiteNavLinkLi : ''}>
                  <p 
                    className={isContactPage ? styles.whiteNavLinkP : styles.navLinkP} 
                    onClick={() => navigate(path)}
                  >
                    {label}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
        
        {/* Icons on the right */}
        <div className={styles.icons}>
          <div className={styles.cartIconContainer}>
            <FontAwesomeIcon 
              onClick={handleCartClick} 
              className={`${styles.cartIcon} ${isContactPage ? styles.whiteIcon : ''}`} 
              icon={faCartShopping} 
            />
            {cartItems.length > 0 && (
              <span className={styles.cartCount} onClick={handleCartClick}>
                {cartItems.reduce((total, item) => total + item.quantity, 0)}
              </span>
            )}
            {cartIsOpen && <CartSummary cartItems={cartItems} onClose={() => setCartIsOpen(false)} />}
          </div>
          {/* <FontAwesomeIcon 
            icon={faUser} 
            className={`${styles.userIcon} ${isContactPage ? styles.whiteIcon : ''}`} 
          /> */}
          <FontAwesomeIcon 
            className={`${styles.burgerIcon} ${isContactPage ? styles.whiteIcon : ''}`} 
            onClick={toggleMenu} 
            icon={faBars} 
          />
        </div>

        {/* Dropdown menu for mobile on non-Contacts pages */}
        {menu && !isContactPage && (
          <div className={styles.dropdownMenu}>
            <ul className={styles.dropdownLinks}>
              {["/ourstory", "/ourservice", "/shop", "/contacts"].map((path, index) => {
                const label = path.slice(1).toUpperCase().replace(/_/g, ' ');
                return (
                  <li key={index}>
                    <p onClick={() => navigate(path)}>{label}</p>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>

      {/* Modal Overlay for Contacts page */}
      {isContactPage && menu && (
        <div className={styles.modalOverlay} onClick={() => openMenu(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <ul>
              {["/ourstory", "/ourservice", "/shop", "/contacts"].map((path, index) => {
                const label = path.slice(1).toUpperCase().replace(/_/g, ' ');
                return (
                  <li key={index}>
                    <p onClick={() => { navigate(path); openMenu(false); }}>{label}</p>
                  </li>
                );
              })}
            </ul>
            <button onClick={() => openMenu(false)} className={styles.closeButton}>Close</button>
          </div>
        </div>
      )}
    </Nav>
  );
};

export default Header;