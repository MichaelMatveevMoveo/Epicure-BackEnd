import express from "express";

import { swaggerDocs } from "./utils/swagger";
const app = express();
const mongoConnectdb = require("./mongoDB/mongoConnect");
const apiRouter = require("./routes/apiRoutes/api.route");

const port = process.env.PORT || 3000;

mongoConnectdb();

app.use(express.json());

app.use("/api", apiRouter);

swaggerDocs(app, port);

app.listen(port, () =>
  console.log(`on port ${port} : http://localhost:3000/ `)
);
