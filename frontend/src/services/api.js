import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5001/api",
});

export async function fetchTrends(params) {
    try {
        const response = await API.get("/trends", { params });
        return response.data;
    } catch (error) {
        console.error("API Error:", error);
        throw error;
    }
}
