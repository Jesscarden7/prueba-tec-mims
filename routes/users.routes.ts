import express, { Router } from "express";
const usersRouter: Router = express.Router();

import usersController from "../controllers/usersController";

usersRouter.post("/register", usersController.register);

usersRouter.post("/login", usersController.login);

export default usersRouter;
