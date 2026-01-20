import { generateFinancialInsights } from "../services/aiInsightsService.js";
import responseDTO from "../utils/responseDTO.js";

export const getAIInsights = async (req, res, next) => {
  try {
    const financeSnapshot = req.body;
    const insights = await generateFinancialInsights(financeSnapshot);
    responseDTO(res, 200, 'AI insights generated.', insights)
  } catch (error) {
    next(error);
  }
};