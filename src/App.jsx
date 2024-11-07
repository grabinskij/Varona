import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "../components/Header";
import Home from "./Pages/Home";
import OurStory from "./Pages/OurStory";
import OurService from "./Pages/OurService";
import Blog from "./Pages/Blog";
import Contacts from "./Pages/Contacts";
import Shop from "./Pages/Shop";
import Footer from "../components/Footer";
import { CartProvider } from '../components/CartContext';

const App = () => {
  return (
    <CartProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ourstory" element={<OurStory />} />
          <Route path="/ourservice" element={<OurService />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/shop" element={<Shop />} />
        </Routes>
        <Footer />
      </Router>
    </CartProvider>
  );
};

export default App;