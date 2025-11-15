
import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { validateQuery } from "../middleware/validation";
import { getUsersSchema } from "../validation/userSchemas";
import { getUsers, getUsersCount } from "../db/users/users";

const router = Router();

router.get("/", 
  validateQuery(getUsersSchema),
  asyncHandler(async (req, res) => {
    const { pageNumber, pageSize } = req.query;

    const users = await getUsers(Number(pageNumber), Number(pageSize));
    const total = await getUsersCount();
    
    res.json({
      success: true,
      message:"Users Fetched Successfully",
      data: users,
      pagination: {
        page: Number(pageNumber),
        pageSize: Number(pageSize),
        total,
        totalPages: Math.ceil(total / Number(pageSize))
      }
    });
  })
);

router.get("/count", asyncHandler(async (req, res) => {
  const count = await getUsersCount();
  
  res.json({
    success: true,
    message: "Users Count Fetched Successfully",
    data: { count },
  });
}));

export default router;