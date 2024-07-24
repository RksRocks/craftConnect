// src/api/axios.js
import axios from "axios";

const instance = axios.create({
  baseURL: "https://craftconnect-c5w4.onrender.com/api",
  withCredentials: true, // This will send the cookies along with requests
});

export default instance;
