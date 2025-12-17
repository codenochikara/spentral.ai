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

const expenseCreateSchema = Joi.object({
  user_id: Joi.string().required(),
  amount: Joi.number().positive().min(0.01).required(),
  category: Joi.string().valid('food', 'transport', 'entertainment', 'health', 'shopping', 'bills', 'autopay', 'other').required(),
  description: Joi.string().trim().max(255),
  date: Joi.date().default(Date.now),
  notes: Joi.string().trim().max(255).optional()
});

export const validateCreateExpense = (req, res, next) => {
  const { error } = expenseCreateSchema.validate(req.body);
  if (error) {
    throw new ValidationError(error);
  }
  next();
};

const expenseUpdateSchema = Joi.object({
  amount: Joi.number().positive().min(0.01),
  category: Joi.string().valid('food', 'transport', 'entertainment', 'health', 'shopping', 'bills', 'autopay', 'other'),
  description: Joi.string().trim().max(255),
  date: Joi.date().default(Date.now),
  notes: Joi.string().trim().max(255).optional()
}).min(1);

export const validateUpdateExpense = (req, res, next) => {
  const { error } = expenseUpdateSchema.validate(req.body);
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
