import * as incomesRepository from "../repositories/incomesRepository.js";
import { NotFoundError } from "../utils/errors.js";

export const processCreateIncome = async (userId, amount, source, description, notes) => {
  const newIncome = await incomesRepository.createIncome(userId, amount, source, description, notes);
  return newIncome;
};

export const processGetIncomesByUserId = async (userId, limit) => {
  const incomes = await incomesRepository.getIncomesByUserId(userId, limit);
  if (!incomes || incomes.length === 0) {
    throw new NotFoundError(null, "Incomes not found");
  }
  return incomes;
};

export const processUpdateIncomeById = async (id, amount, source, description, notes) => {
  const updatedIncome = await incomesRepository.updateIncomeById(id, amount, source, description, notes);
  if (!updatedIncome) {
    throw new NotFoundError(null, "Income not found");
  }
  return updatedIncome;
};

export const processDeleteIncomeById = async (id) => {
  const deletedCount = await incomesRepository.deleteIncomeById(id);
  if (deletedCount === 0) {
    throw new NotFoundError(null, "Income not found");
  }
};