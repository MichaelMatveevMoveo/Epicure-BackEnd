import express from "express";

const app = express();
const mongoConnectdb = require("./mongoDB/mongoConnect");
const apiRouter = require("./routes/apiRoutes/api.route");

const PORT = process.env.PORT || 3000;

mongoConnectdb();

app.use(express.json());

app.use("/api", apiRouter);

app.listen(PORT, () =>
  console.log(`on port ${PORT} : http://localhost:3000/ `)
);
