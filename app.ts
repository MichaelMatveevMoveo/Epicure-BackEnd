import express from "express";
import "dotenv/config";
import cors from "cors";

import { swaggerDocs } from "./utils/swagger";

const app = express();
const mongoConnectdb = require("./mongoDB/mongoConnect");
const apiRouter = require("./routes/apiRoutes/api.route");

app.use(cors());

const port = process.env.PORT || 2000;

mongoConnectdb();

app.use(express.json());

app.use("/api", apiRouter);

swaggerDocs(app, port);

app.listen(port, () =>
  console.log(`on port ${port} : http://localhost:${port}/ `)
);
