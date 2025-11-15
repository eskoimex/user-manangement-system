import Joi from 'joi';

export const getUsersSchema = Joi.object({
  pageNumber: Joi.number().integer().min(0).default(0).messages({
    'number.min': 'Page number must be 0 or greater',
    'number.base': 'Page number must be a number'
  }),
  pageSize: Joi.number().integer().min(1).max(100).default(10).messages({
    'number.min': 'Page size must be at least 1',
    'number.max': 'Page size must not exceed 100',
    'number.base': 'Page size must be a number'
  })
});