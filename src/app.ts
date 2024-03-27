import express, { Router } from "express";
import "dotenv/config";
import cors from "cors";

import { swaggerDocs } from "./utils/swagger";
import cookieParser from "cookie-parser";

const app = express();
const mongoConnectdb = require("./mongoDB/mongoConnect");
const apiRouter = require("./routes/apiRoutes/api.route");

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

const port = process.env.PORT || 2000;

mongoConnectdb();

app.use(express.json());

app.use(cookieParser());

app.use("/api", apiRouter);

swaggerDocs(app, port);

app.listen(port, () =>
  console.log(`on port ${port} : http://localhost:${port}/ `)
);
