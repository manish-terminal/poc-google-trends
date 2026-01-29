import fetch from "node-fetch";
import { buildQuery } from "../utils/buildQuery.js";

const BASE_URL = "https://serpapi.com/search.json";

export async function fetchGoogleTrends(params) {
    const queryString = buildQuery({
        ...params,
        engine: "google_trends",
        api_key: process.env.SERPAPI_KEY
    });

    const response = await fetch(`${BASE_URL}?${queryString}`);
    if (!response.ok) {
        throw new Error("SerpApi request failed");
    }

    return response.json();
}
