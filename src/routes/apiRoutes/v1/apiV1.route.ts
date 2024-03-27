import express, { Request, Response } from "express";

const chefsRouter = require("./routes/chefs.route");
const dishesRouter = require("./routes/dishes.route");
const restaurantsRouter = require("./routes/restaurants.route");
const searchRouter = require("./routes/Search.route");
const cloudRouter = require("./routes/cloud.route");
const usersRouter = require("./routes/users.route");
const router = express.Router();

router.use("/chefs", chefsRouter);

router.use("/dishes", dishesRouter);

router.use("/restaurants", restaurantsRouter);

router.use("/search", searchRouter);

router.use("/cloud", cloudRouter);

router.use("/users", usersRouter);

module.exports = router;
