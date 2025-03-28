import axios from "axios";
import refreshToken from "./refreshToken";

const BASE_URL = "https://react-nodejs-ecommerce-api.vercel.app";

const axiosAPI = axios.create({
    baseURL: BASE_URL,
});

axiosAPI.interceptors.response.use(
    (response) => {
        return response;
    },
    async function (error) {
        const originalRequest = error.config;
        if (error.response.status === 403 && !originalRequest.sent) {
            originalRequest.sent = true;
            const access_token = await refreshToken();
            localStorage.setItem("AUTH", access_token);
            originalRequest.headers["Authorization"] = "Bearer " + access_token;
            return axios(originalRequest);
        }
        return Promise.reject(error);
    }
);

export default axiosAPI;
