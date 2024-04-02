import { Router } from "express";
import adminRouter from "./admin.routes";
import userRouter from "./user.routes";
import blogRouter from "./blog.routes";
const mainRouter = Router();

mainRouter.get("/", (req, res) => {
  res.send("wo wo wold");
});
mainRouter.use("/admin", adminRouter).use("/user",userRouter).use("/blogs",blogRouter);

export default mainRouter;
