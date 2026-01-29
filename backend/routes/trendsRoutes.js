import express from "express";
import { getTrends } from "../controllers/trendsController.js";

const router = express.Router();

/*
 Single powerful endpoint:
 /api/trends
*/
router.get("/", getTrends);

export default router;
