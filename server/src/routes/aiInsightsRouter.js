import express from 'express';
const router = express.Router();

import { getAIInsights } from '../controllers/aiInsightsController.js';

router.post('/', getAIInsights);

export default router;
