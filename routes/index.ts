import { Router } from "express";

const mainRouter = Router();

mainRouter.get("/", (req, res) => {
  res.send("wo wo wold");
});


export default mainRouter;
