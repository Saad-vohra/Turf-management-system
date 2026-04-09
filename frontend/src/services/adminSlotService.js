import axios from "axios";

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const blockSlot = (data) => {
  return axios.post("http://localhost:5000/api/admin/slots/block", data ,getAuthHeader());
  
};

export const getBlockedSlots = (date, courtType) => {
  return axios.get("http://localhost:5000/api/admin/slots/blocked-slots", {
    params: { date, courtType },...getAuthHeader(),
  });
};

export const unblockSlot = (id) => {
  return axios.delete(`http://localhost:5000/api/admin/slots/unblock/${id}`, getAuthHeader());
};

export const blockFullDay = ({date, courtType}) => {
  return axios.post(
    "http://localhost:5000/api/admin/slots/block-full-day",{
      date,
      courtType,
      reason: "Maintenance",
    },
    getAuthHeader()
  );
};


export const  createOfflineBooking = (data) => {
  return axios.post("http://localhost:5000/api/admin/slots/offline-booking", data ,getAuthHeader());
  
};
