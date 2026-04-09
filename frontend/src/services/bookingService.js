import axios from "axios";
const API_URL = "http://localhost:5000/api/bookings";


export const createBooking = (data) => {
  return axios.post("http://localhost:5000/api/bookings/create", data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const getBookedSlots = (date, courtType) => {
  return axios.get(
    `http://localhost:5000/api/bookings/booked-slots?date=${date}&courtType=${courtType}`
  );
};


export const confirmBookingPayment = async (bookingId) => {
  const res = await axios.post(
    `${API_URL}/confirm-payment`,
    { bookingId },
    {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }
  );
  return res.data.booking; // return updated booking with ticketPath
};

export const getBookingById = async (bookingId) => {
  const res = await axios.get(`${API_URL}/${bookingId}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  return res.data.booking;
};
