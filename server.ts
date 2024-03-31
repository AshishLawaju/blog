import express from "express";
import http from "http";

import connectDb from "./utils/connectDb";
import "dotenv/config";
import mainRouter from "./routes";
import { errorHandlerMiddleware } from "./middleware/errorHandler";

const app = express();
app.use(express.json({ limit: "16kb" }));
// app.use(cookieParser());
app.use(express.urlencoded({ limit: "16kb", extended: true }));
// app.use("/api/users", authRouter);
app.use("/api", mainRouter);

app.use(errorHandlerMiddleware);
// app.get("/",(req,res)=>{
//   res.send("hello wo")
// })
const PORT = (process.env.PORT as string) || 4000;
const server = http.createServer(app);

connectDb()
  .then(() => {
    server.listen(PORT, () => console.log("server is listening to port 4000"));
  })
  .catch((err) => console.log("error", err));
