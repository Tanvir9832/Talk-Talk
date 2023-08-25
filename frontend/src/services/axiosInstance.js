import axios from "axios";

 const axiosInstance = axios.create({
    timeout : "200000",
    baseURL : "http://localhost:8080/"
})

export default axiosInstance;