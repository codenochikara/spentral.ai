import Joi from 'joi';
import { ValidationError } from '../utils/errors.js';

const userSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
});

export const validateUser = (req, res, next) => {
  const { error } = userSchema.validate(req.body);
  if (error) {
    throw new ValidationError(error);
  }
  next();
};

const createExpenseSchema = Joi.object({
  amount: Joi.number().positive().min(0.01).required(),
  category: Joi.string().valid('food', 'transport', 'entertainment', 'health', 'shopping', 'bills', 'autopay', 'other').required(),
  description: Joi.string().trim().max(255),
  date: Joi.date().default(Date.now),
  notes: Joi.string().trim().max(255).optional()
});

export const validateCreateExpense = (req, res, next) => {
  const { error } = createExpenseSchema.validate(req.body);
  if (error) {
    throw new ValidationError(error);
  }
  next();
};

const updateExpenseSchema = Joi.object({
  amount: Joi.number().positive().min(0.01),
  category: Joi.string().valid('food', 'transport', 'entertainment', 'health', 'shopping', 'bills', 'autopay', 'other'),
  description: Joi.string().trim().max(255),
  date: Joi.date().default(Date.now),
  notes: Joi.string().trim().max(255).optional()
}).min(1);

export const validateUpdateExpense = (req, res, next) => {
  const { error } = updateExpenseSchema.validate(req.body);
  if (error) {
    throw new ValidationError(error);
  }
  next();
};

const loginSchema = Joi.object({
  identifier: Joi.string().trim().min(3).max(50).required() || Joi.string().email().required(),
  password: Joi.string().min(6).required()
})

export const validateLoginSchema = (req, res, next) => {
  const { error } = loginSchema.validate(req.body);
  if (error) {
    throw new ValidationError(error);
  }
  next();
}

const createIncomeSchema = Joi.object({
  amount: Joi.number().positive().min(0.01).required(),
  source: Joi.string().trim().max(50).required(),
  description: Joi.string().trim().max(255),
  notes: Joi.string().trim().max(255).optional()
});

export const validateCreateIncome = (req, res, next) => {
  const { error } = createIncomeSchema.validate(req.body);
  if (error) {
    throw new ValidationError(error);
  }
  next();
};

const updateIncomeSchema = Joi.object({
  amount: Joi.number().positive().min(0.01),
  source: Joi.string().trim().max(50),
  description: Joi.string().trim().max(255),
  notes: Joi.string().trim().max(255).optional()
}).min(1);

export const validateUpdateIncome = (req, res, next) => {
  const { error } = updateIncomeSchema.validate(req.body);
  if (error) {
    throw new ValidationError(error);
  }
  next();
};
