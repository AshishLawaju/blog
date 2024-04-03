import { Router } from "express";
import {blogCreate, blogUpdate, blogDelete}from "../controllers/blog.controller";

const router = Router()

router.route("/createblog").post(blogCreate);
router.route("/:id/update").post(blogUpdate);
router.route("/:id/delete").delete(blogDelete);
export default router
