import { axiosPrivate } from "../services/axios"

const useRefreshToken = () => {
    const refresh = async () => {
        const response = await axiosPrivate.post("/auth/refresh");
        console.log(response.data)
        return response.data.token;
    }
    return refresh
}

export default useRefreshToken;