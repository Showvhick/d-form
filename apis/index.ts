import express, { Express, Request, Response } from "express";
import routes from "./src/routes";
import startup from "./src/startups/policy";
import dotenv from "dotenv";
const app: Express = express();

startup(app);
dotenv.config();

app.get("/", (req: Request, res: Response) => {
  res.send({
    version: 1.0,
  });
});

app.use("/api", routes);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`APIs are running at port - ${port}`);
});
