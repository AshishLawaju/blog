import { Router } from "express";

import {blogCreate, blogUpdate, blogDelete,blogAll, usersBlog}from "../controllers/blog.controller";
=======
import {
  blogCreate,
  blogUpdate,
  blogDelete,
  likeBlog,
  removeLikeBlog,
} from "../controllers/blog.controller";
import {
  adminScope,
  tokenExtractor,
  verifyToken,
} from "../middleware/tokenAuth";

const router = Router();


router.route("/createblog").post(blogCreate);
router.route("/:id/update").post(blogUpdate);
router.route("/:id/delete").delete(blogDelete);
router.route("/allblog").get(blogAll);
router.route("/user/:id").get(usersBlog)
export default router
=======
router.route("/createblog").post(tokenExtractor, verifyToken, blogCreate);
router.route("/:id/update").post(tokenExtractor, verifyToken, blogUpdate);
router.route("/:id/delete").delete(tokenExtractor, adminScope, blogDelete);
router.route("/like/:blogId").put(tokenExtractor, verifyToken, likeBlog);
router.route("/removelike/:blogId").put(tokenExtractor, verifyToken, removeLikeBlog);
export default router;

