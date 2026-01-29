import express from "express";
import dotenv from "dotenv";
import trendsRoutes from "./routes/trendsRoutes.js";
import cors from "cors";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/trends", trendsRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Google Trends backend running on port ${process.env.PORT}`);
});
