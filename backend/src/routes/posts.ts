
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

router.post("/",
  validate(createPostSchema),
  asyncHandler(async (req, res) => {
    const { userId, title, body } = req.body;

    const userExistsResult = await userExists(userId);
    if (!userExistsResult) {
      throw new NotFoundError("User");
    }

    const newPost = await createPost(userId, title, body);
    
    res.status(201).json({
      success: true,
      data: newPost,
      message: "Post created successfully"
    });
  })
);

export default router;