# Google Trends Backend (SerpApi Proxy)

This backend is a small **Express** API that proxies **SerpApi's Google Trends engine** (`engine=google_trends`) and returns the parsed JSON in a frontend-friendly shape.

## Tech

- **Node.js** (ESM modules)
- **Express**
- **dotenv**
- **node-fetch**
- **cors**

## Setup

### 1) Install dependencies

```bash
cd backend
npm install
```

### 2) Configure environment variables

Create a `.env` file in `backend/` (you can start from `backend/env.example`):

```bash
cp env.example .env
```

Required variables:

- **`SERPAPI_KEY`**: Your SerpApi API key
- **`PORT`**: Port for the backend server (example: `3001`)

Example `.env`:

```bash
PORT=3001
SERPAPI_KEY=your_serpapi_key_here
```

### 3) Start the server

```bash
npm start
```

The server mounts routes under:

- **`/api/trends`**

## API

### `GET /api/trends`

Fetch Google Trends data via SerpApi.

**Query parameters** (all optional; defaults come from the controller):

- **`q`**: search term (default: `quantum computing`)
- **`data_type`**: which Trends dataset to return (default: `TIMESERIES`)
  - Common values (SerpApi): `TIMESERIES`, `GEO_MAP`, `RELATED_TOPICS`, `RELATED_QUERIES`
- **`date`**: time range (default: `today 12-m`)
- **`geo`**: geography code (optional)
- **`region`**: region filter (optional)
- **`hl`**: language (default: `en`)
- **`tz`**: timezone offset minutes (default: `420`)
- **`gprop`**: property filter (optional, e.g. `images`, `news`, `youtube`, `froogle`)
- **`cat`**: category (optional)
- **`include_low_search_volume`**: include low-volume regions (optional)
- **`csv`**: request CSV (optional)
- **`no_cache`**: bypass cache (optional)

**Response shape**:

```json
{
  "metadata": {},
  "parameters": {},
  "results": {}
}
```

- `metadata`: SerpApi `search_metadata`
- `parameters`: SerpApi `search_parameters`
- `results`: one of:
  - `interest_over_time`
  - `interest_by_region`
  - `compared_breakdown_by_region`
  - `related_topics`
  - `related_queries`

## Examples

### Interest over time (default)

```bash
curl "http://localhost:3001/api/trends?q=quantum%20computing&data_type=TIMESERIES&date=today%2012-m"
```

### Interest by region

```bash
curl "http://localhost:3001/api/trends?q=tesla&data_type=GEO_MAP&date=today%2012-m"
```

## Project structure

```txt
backend/
  controllers/
    trendsController.js     # Parses query params + shapes the response
  routes/
    trendsRoutes.js         # GET /api/trends
  services/
    serpapiService.js       # Calls SerpApi (engine=google_trends)
  utils/
    buildQuery.js           # URLSearchParams helper
  server.js                 # Express app bootstrap
```

## Notes / troubleshooting

- If you see `Failed to fetch Google Trends data`, confirm **`SERPAPI_KEY`** is set and valid.
- Make sure **`PORT`** is set in `backend/.env` (the server uses `process.env.PORT`).

