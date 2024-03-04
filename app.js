const express = require("express");
const app = express();
const mongoConnectdb = require("./mongoDB/mongoConnect");

const chefsRouter = require("./routes/chefs");

const dishesRouter = require("./routes/dishes");

const PORT = process.env.PORT || 3000;

mongoConnectdb();

app.use(express.json());

app.use("/api/chefs", chefsRouter);

app.use("/api/dishes", dishesRouter);

app.listen(PORT, () =>
  console.log(`on port ${PORT} : http://localhost:3000/ `)
);
