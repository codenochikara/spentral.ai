import { processCreateIncome, processDeleteIncomeById, processGetIncomesByUserId, processUpdateIncomeById } from "../services/incomesService.js";
import responseDTO from "../utils/responseDTO.js";

const createIncome = async (req, res, next) => {
  const { amount, source, description, notes } = req.body;
  const userId = req.user.userId;

  try {
    const income = await processCreateIncome(userId, amount, source, description, notes);
    responseDTO(res, 201, 'Income created successfully.', income);
  } catch (error) {
    next(error);
  }
};

const getIncomesByUserId = async (req, res, next) => {
  const { limit } = req.query || 10;
  const userId = req.user.userId;

  try {
    const incomes = await processGetIncomesByUserId(userId, limit);
    responseDTO(res, 200, 'Incomes fetched successfully.', incomes);
  } catch (error) {
    next(error);
  }
};

const updateIncomeById = async (req, res, next) => {
  const { id } = req.params;
  const { amount, source, description, notes } = req.body;

  try {
    const income = await processUpdateIncomeById(id, amount, source, description, notes);
    responseDTO(res, 200, 'Income updated successfully.', income);
  } catch (error) {
    next(error);
  }
};

const deleteIncomeById = async (req, res, next) => {
  const { id } = req.params;

  try {
    await processDeleteIncomeById(id);
    responseDTO(res, 204);
  } catch (error) {
    next(error);
  }
};

export { createIncome, deleteIncomeById, getIncomesByUserId, updateIncomeById };
