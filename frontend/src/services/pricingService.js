import axios from "axios";

export const calculatePrice = (data) => {
  return axios.post(
    "http://localhost:5000/api/pricing/calculate",
    data
  );
};


// EXTRA FOR ADMIN UPDATE 

export const getPricing = () => axios.get("http://localhost:5000/api/pricing");

export const updatePricing = (data) => axios.put("http://localhost:5000/api/pricing", data);