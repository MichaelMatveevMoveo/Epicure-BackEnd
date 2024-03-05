import express, { Request, Response } from "express";

const chefsRouter = require("./chefs.route");
const dishesRouter = require("./dishes.route");
const restaurantsRouter = require("./restaurants.route");

const router = express.Router();

router.use("/chefs", chefsRouter);

router.use("/dishes", dishesRouter);

router.use("/restaurants", restaurantsRouter);

module.exports = router;
