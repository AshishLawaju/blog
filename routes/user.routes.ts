


import { Router } from "express";
import { login, myFollowers, myFollowing, newfollow, register, unfollow } from "../controllers/user.controller";
import { tokenExtractor, verifyToken } from "../middleware/tokenAuth";


const router = Router()


router.route("/login").post(login)
router.route("/register").post(register)
router.route("/follow/:id").put(tokenExtractor,verifyToken,newfollow)
router.route("/unfollow/:id").put(tokenExtractor,verifyToken,unfollow)
router.route("/following/:id").get(myFollowing)
router.route("/follower/:id").get(myFollowers)

export default router