import axios from "axios";

const API = "http://localhost:5000/api/admin/management";

// const authHeader = () => ({
//   headers: {
//     Authorization: `Bearer ${localStorage.getItem("token")}`,
//   },
// });


const authHeader = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};







export const fetchBookings = (params) =>
  axios.get(`${API}/bookings`, {
    ...authHeader(),
    params,
  });

export const markCheckedIn = (id) =>
  axios.put(`${API}/bookings/${id}/checkin`, {}, authHeader());

// export const viewTicket = (id) =>{
//     const token = localStorage.getItem("token");
//   window.open(`${API}/bookings/ticket/${id}?token=${token}`, "_blank" ,authHeader());
// };


export const viewTicket = async (bookingId) => {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.get(
      `http://localhost:5000/api/admin/management/bookings/ticket/${bookingId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: "blob",
      }
    );

    const file = new Blob([res.data], { type: "application/pdf" });
    const fileURL = URL.createObjectURL(file);
    window.open(fileURL);
  } catch (err) {
    alert("TIcket will not generate due to offline booking!");
    console.error(err);
  }
};

