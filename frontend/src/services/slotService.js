import axios from "axios";

export const getSlots = (date, duration,courtType) => {
  return axios.get(
    `http://localhost:5000/api/slots/available-slots?date=${date}&duration=${duration}&courtType=${courtType}`
  );
};
