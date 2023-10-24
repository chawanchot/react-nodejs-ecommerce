import axios from "./axios";

const refresh = async () => {
    const response = await axios.post("/auth/refresh", void 0, {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("RE_A")
        }
    });

    return response.data.token;
}

export default refresh;