import api from "./axios";

export const getAIInsights = (financeSnapshot) =>
  api.post("/ai-insights", financeSnapshot);