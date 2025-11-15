
import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { NotFoundError } from "../exceptions/AppError";
import { validate, validateQuery, validateParams } from "../middleware/validation";
import { 
  createPostSchema, 
  getPostsSchema, 
  deletePostSchema 
} from "../validation/postSchemas";
import { getPosts, deletePost, createPost, userExists } from "../db/posts/posts";

const router = Router();

// GET /posts - With query validation
router.get("/", 
  validateQuery(getPostsSchema),
  asyncHandler(async (req, res) => {
    const { userId } = req.query;

    const posts = await getPosts(userId as string);
    
    res.json({
      success: true,
      data: posts,
      count: posts.length
    });
  })
);

// DELETE /posts/:id - With params validation
router.delete("/:id",
  validateParams(deletePostSchema),
  asyncHandler(async (req, res) => {
    const { id } = req.params;

    const wasDeleted = await deletePost(id);

    if (!wasDeleted) {
      throw new NotFoundError("Post");
    }

    res.json({
      success: true,
      message: "Post deleted successfully"
    });
  })
);

// POST /posts - With body validation
router.post("/",
  validate(createPostSchema),
  asyncHandler(async (req, res) => {
    const { userId, title, body } = req.body;

    // Check if user exists (business logic validation)
    const userExistsResult = await userExists(userId);
    if (!userExistsResult) {
      throw new NotFoundError("User");
    }

    // Create post (data is already validated and sanitized by Joi)
    const newPost = await createPost(userId, title, body);
    
    res.status(201).json({
      success: true,
      data: newPost,
      message: "Post created successfully"
    });
  })
);

export default router;