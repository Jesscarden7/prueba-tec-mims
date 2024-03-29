import express, { Express, Request, Response, Application } from "express";
import usersRouter from "./routes/users.routes";

const app: Application = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use("/api/auth", usersRouter);

app.get("/", (req: Request, res: Response) => {
  console.log("Hola desde TS");
  res.send("Service avaliable");
});

app.listen(3000, () => {
  console.log("Server running in port 3000");
});
