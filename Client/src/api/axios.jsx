import axios from "axios";

// eslint-disable-next-line react-refresh/only-export-components
const instance = axios.create({
  baseURL: "https://cheapserverhub.com:446",
  // baseURL: "http://localhost:8080",
  withCredentials: true,
});

export default instance;
