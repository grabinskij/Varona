import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "../components/Header";
import Home from "./Pages/Home";
import OurStory from "./Pages/OurStory";
import OurService from "./Pages/OurService";
import Contacts from "./Pages/Contacts";
import Shop from "./Pages/Shop";
import Footer from "../components/Footer";
import { CartProvider } from '../components/CartContext';
// import { position } from "@cloudinary/url-gen/qualifiers/timeline";

const App = () => {
  return (
    <CartProvider>
      <Router>
        <Header />
        <Routes>
          <Route style={{position: 'absolute'}}  path="/" element={<Home />} />
          <Route style={{position: 'relative'}}  path="/ourstory" element={<OurStory />} />
          <Route style={{position: 'relative'}}  path="/ourservice" element={<OurService />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/shop" element={<Shop />} />
        </Routes>
        <Footer />
      </Router>
    </CartProvider>
  );
};

export default App;