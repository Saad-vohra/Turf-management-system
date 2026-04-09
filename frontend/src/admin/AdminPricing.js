// import React, { useEffect, useState } from "react";
// import { getPricing, updatePricing } from "../services/pricingService";
// import "./AdminPricing.css";

// const AdminPricing = () => {
//   const [pricing, setPricing] = useState([]);

//   useEffect(() => {
//     fetchPricing();
//   }, []);

//   const fetchPricing = async () => {
//     const res = await getPricing();
//     setPricing(res.data);
//   };

//   const handleChange = (index, field, value) => {
//     const updated = [...pricing];
//     updated[index][field] = value;
//     setPricing(updated);
//   };

//   const savePricing = async (court) => {
//     await updatePricing({
//       courtType: court.courtType,
//       pricePerHour: Number(court.pricePerHour),
//       weekendPricePerHour: Number(court.weekendPricePerHour),
//     });

//     alert("Pricing updated");
//   };

//   return (
//     <div className="pricing-container">
//       <h2>💰 Turf Pricing</h2>

//       {pricing.map((court, index) => (
//         <div key={court._id} className="pricing-card">
//           <div className="card-header">
//             <h3>{court.courtType.toUpperCase()}</h3>
//           </div>

//           <div className="price-grid">
//             <div className="input-group">
//               <label>Weekday Price</label>
//               <div className="input-wrapper">
//                 <span>₹</span>
//                 <input
//                   type="number"
//                   value={court.pricePerHour}
//                   onChange={(e) =>
//                     handleChange(index, "pricePerHour", e.target.value)
//                   }
//                 />
//               </div>
//             </div>

//             <div className="input-group">
//               <label>Weekend Price</label>
//               <div className="input-wrapper">
//                 <span>₹</span>
//                 <input
//                   type="number"
//                   value={court.weekendPricePerHour}
//                   onChange={(e) =>
//                     handleChange(index, "weekendPricePerHour", e.target.value)
//                   }
//                 />
//               </div>
//             </div>
//           </div>

//           <button className="save-btn" onClick={() => savePricing(court)}>
//             Save Changes
//         </button>
//       </div>
//       ))}
//     </div>
//   );
// };

// export default AdminPricing;

















import React, { useEffect, useState } from "react";
import { getPricing, updatePricing } from "../services/pricingService";
import "./AdminPricing.css";

const AdminPricing = () => {
  const [pricing, setPricing] = useState([]);

  useEffect(() => {
    fetchPricing();
  }, []);

  const fetchPricing = async () => {
    const res = await getPricing();
    setPricing(res.data);
  };

  const handleChange = (index, field, value) => {
    const updated = [...pricing];
    updated[index][field] = value;
    setPricing(updated);
  };

  const savePricing = async (court) => {
    await updatePricing({
      courtType: court.courtType,
      pricePerHour: Number(court.pricePerHour),
      weekendPricePerHour: Number(court.weekendPricePerHour),
    });

    alert("Pricing updated successfully ✅");
  };

  return (
    <div className="pricing-container">
      <h2>💰 Turf Pricing</h2>

      {pricing.map((court, index) => (
        <div key={court._id} className="pricing-card">
          
          <div className="card-header">
            <h3>{court.courtType.toUpperCase()}</h3>
          </div>

          <div className="price-grid">

            {/* Weekday */}
            <div className="input-group">
              <label>Weekday Price (₹ / hour)</label>
              <div className="input-box">
                <span className="rupee">₹</span>
                <input
                  type="number"
                  value={court.pricePerHour}
                  onChange={(e) =>
                    handleChange(index, "pricePerHour", e.target.value)
                  }
                />
              </div>
            </div>

            {/* Weekend */}
            <div className="input-group">
              <label>Weekend Price (₹ / hour)</label>
              <div className="input-box">
                <span className="rupee">₹</span>
                <input
                  type="number"
                  value={court.weekendPricePerHour}
                  onChange={(e) =>
                    handleChange(index, "weekendPricePerHour", e.target.value)
                  }
                />
              </div>
            </div>

          </div>

          <button className="save-btn" onClick={() => savePricing(court)}>
            Save Changes
          </button>
        </div>
      ))}
    </div>
  );
};

export default AdminPricing;