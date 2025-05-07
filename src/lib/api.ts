import axios from "axios";

const api = axios.create({
    baseURL: "https://api.xbase.app/api",
    headers: {
        "Content-Type": "application/json",
    },
});

export default api;