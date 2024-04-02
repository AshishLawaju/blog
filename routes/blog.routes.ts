import { Router } from "express";
import {blogCreate, blogUpdate, blogDelete,blogAll, usersBlog}from "../controllers/blog.controller";

const router = Router()

router.route("/createblog").post(blogCreate);
router.route("/:id/update").post(blogUpdate);
router.route("/:id/delete").delete(blogDelete);
router.route("/allblog").get(blogAll);
router.route("/user/:id").get(usersBlog)
export default router
