import { fetchGoogleTrends } from "../services/serpapiService.js";

export async function getTrends(req, res) {
    try {
        const {
            q = "quantum computing",
            data_type = "TIMESERIES",
            date = "today 12-m",
            geo,
            region,
            hl = "en",
            tz = "420",
            gprop,
            cat,
            include_low_search_volume,
            csv,
            no_cache
        } = req.query;

        const params = {
            q,
            data_type,
            date,
            geo,
            region,
            hl,
            tz,
            gprop,
            cat,
            include_low_search_volume,
            csv,
            no_cache
        };

        const data = await fetchGoogleTrends(params);

        res.json({
            metadata: data.search_metadata,
            parameters: data.search_parameters,
            results:
                data.interest_over_time ||
                data.interest_by_region ||
                data.compared_breakdown_by_region ||
                data.related_topics ||
                data.related_queries
        });
    } catch (error) {
        res.status(500).json({
            error: "Failed to fetch Google Trends data",
            details: error.message
        });
    }
}
