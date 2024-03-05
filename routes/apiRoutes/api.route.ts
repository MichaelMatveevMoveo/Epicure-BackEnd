import express, { Request, Response } from "express";

const v1Router = require("./v1/apiV1.route");

const router = express.Router();

router.use("/v1", v1Router);

module.exports = router;
