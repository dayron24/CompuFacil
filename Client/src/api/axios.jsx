import axios from "axios";

// eslint-disable-next-line react-refresh/only-export-components
const instance = axios.create({
  baseURL: "https://servidorgallos.duckdns.org:446",
  withCredentials: true,
});

export default instance;