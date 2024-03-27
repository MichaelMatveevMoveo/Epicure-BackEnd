import express, { Request, Response } from "express";
import { middlewareCheckTokenJWT } from "../../../../middlewares/authorization.middleware";

const chefsRouter = require("./routes/manageChefs.route");
const dishesRouter = require("./routes/manageDishes.route");
const restaurantsRouter = require("./routes/manageRestaurants.route");

const router = express.Router();

router.use(middlewareCheckTokenJWT);

router.use("/chefs", chefsRouter);

router.use("/dishes", dishesRouter);

router.use("/restaurants", restaurantsRouter);

module.exports = router;
