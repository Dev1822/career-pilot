import express from "express";
const router = express.Router();

import { getJobs, summarizeJob } from "../controllers/jobFetch.js";
import { verifyToken } from '../middleware/auth.js';
import { extractAIProvider } from '../middleware/aiKey.js';

router.get("/",verifyToken , getJobs);
router.post("/summarize", verifyToken, extractAIProvider, summarizeJob);

export default router;