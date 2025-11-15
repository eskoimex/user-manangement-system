import Joi from "joi";

export const createPostSchema = Joi.object({
  userId: Joi.string().required().messages({
    "string.empty": "User ID is required",
    "any.required": "User ID is required",
  }),
  title: Joi.string().trim().min(1).max(255).required().messages({
    "string.empty": "Title is required",
    "string.min": "Title must not be empty",
    "string.max": "Title must be less than 255 characters",
    "any.required": "Title is required",
  }),
  body: Joi.string().trim().min(1).max(5000).required().messages({
    "string.empty": "Body is required",
    "string.min": "Body must not be empty",
    "string.max": "Body must be less than 5000 characters",
    "any.required": "Body is required",
  }),
});

export const getPostsSchema = Joi.object({
  userId: Joi.string().required().messages({
    "string.empty": "User ID is required",
    "any.required": "User ID is required",
  }),
});



export const deletePostSchema = Joi.object({
  id: Joi.string().required().messages({
    "string.empty": "Post ID is required",
    "any.required": "Post ID is required",
  }),
});

