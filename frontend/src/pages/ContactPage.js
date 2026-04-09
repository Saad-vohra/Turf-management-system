import React from "react";
import ContactForm from "../components/ContactForm";
import "../components/contact.css";
import contactImage from "../assets/Contact.png";
import Header from "../components/Header";
import Footer from "../components/Footer";

const ContactPage = () => {

  const turfDetails = {
    name: "Green Arena Turf",
    address: "17, Lakshmi Street, Chennai - 600010",
    email: "support@greenarena.com",
    phone: "+91 9363874901"
  };

  return (
    <>
    <Header/>
    <div className="contact-page">

      <div className="contact-wrapper">

        {/* LEFT SIDE */}
        <div className="contact-left">
          <ContactForm turf={turfDetails}/>
        </div>

        {/* RIGHT SIDE */}
        <div className="contact-right">
  <div className="image-wrapper">
    <img src={contactImage} alt="contact" />
  </div>
</div>

      </div>

    </div>
    <Footer/>
    </>
  );
};

export default ContactPage;