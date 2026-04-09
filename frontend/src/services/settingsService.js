import axios from "axios";

const API = "http://localhost:5000/api/admin/settings";

const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const getSettings = () => axios.get(API, authHeader());
export const updateSettings = (data) => axios.put(API, data, authHeader());
