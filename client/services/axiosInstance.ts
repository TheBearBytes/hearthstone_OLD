import axios from "axios";

const axiosInstance = axios.create({
    headers: {},
    baseURL: `${process.env.URL}api/`,
});

export default axiosInstance;
