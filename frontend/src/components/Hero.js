// import React from "react";
// import { useNavigate } from "react-router-dom";
// import "./Hero.css";

// const Hero = () => {

//   const navigate = useNavigate();

//   const goToNextPage = () => {
//     navigate("/book-turf");
//   };

//   return (
//     <section className="hero">
//       <div className="hero-overlay"></div>

//       <div className="hero-content">
//         <h1>
//           Book Your <span>Perfect Turf</span> Anytime
//         </h1>
//         <p>
//           Easy online turf booking for football, cricket & more.
//           Play smarter. Book faster.
//         </p>

//         <div className="hero-buttons">
//           <button className="primary-btn" onClick={goToNextPage}>Book Now</button>
//           <button className="secondary-btn">View Turfs</button>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Hero;




import React from "react";
import { useNavigate } from "react-router-dom";
import "./Hero.css";

const Hero = () => {

  const navigate = useNavigate();

  const goToNextPage = () => {
    navigate("/book-turf");
  };

  const aboutTurf = () => {
    navigate("/About-turf");
  };

  return (
    <section className="hero">
      <div className="hero-overlay"></div>

      <div className="hero-content">

        <h1 className="hero-title">
          Book Your
          <span className="slider">
            <span className="slide-track">
              <span>Perfect Turf</span>
              <span>Cricket Turf</span>
              <span>Football Turf</span>
              <span>Box Cricket</span>
            </span>
          </span>
          Anytime
        </h1>

        <p>
          Easy online turf booking for football, cricket & more.
          Play smarter. Book faster.
        </p>

        <div className="hero-buttons">
          <button className="primary-btn" onClick={goToNextPage}>
            Book Now
          </button>
          <button className="secondary-btn" onClick={aboutTurf}>About Turf</button>
        </div>

      </div>
    </section>
  );
};

export default Hero;
