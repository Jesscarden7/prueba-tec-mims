/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     RegisterType:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         name:
 *           type: string
 *           description: User name
 *         email:
 *           type: string
 *           description: User email
 *         password:
 *           type: string
 *           description: User password
 *     LoginType:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           description: User email
 *         password:
 *           type: string
 *           description: User password
 *     ResponseType:
 *       type: object
 *       required:
 *         - isSuccesful
 *       properties:
 *         isSuccesful:
 *           type: boolean
 *           description: Is successful response
 *         data:
 *           type: object
 *           description: Generic Data
 *         errorMessage:
 *           type: string
 *           description: Error message
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: The users managing API
 * /api/auth/register:
 *   post:
 *     summary: Creates a new User
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterType'
 *     responses:
 *       201:
 *         description: The created user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ResponseType'
 *       400:
 *         description: Invalid user data
 *       500:
 *         description: Some server error
 * /api/auth/login:
 *   post:
 *     summary: Validates User credentials
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginType'
 *     responses:
 *       200:
 *         description: Token data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ResponseType'
 *       400:
 *         description: Invalid user credentials
 *       500:
 *         description: Some server error
 */

import express, { Router } from "express";
import { check } from "express-validator";

const usersRouter: Router = express.Router();

import usersController from "../controllers/usersController";
import fieldValidation from "../middlewares/fieldsValidation";

usersRouter.post(
  "/register",
  [
    check("name", "Name is required").notEmpty(),
    check("email", "This field is not a valid email").isEmail(),
    check("password", "Password is required").notEmpty(),
    fieldValidation,
  ],
  usersController.register,
);

usersRouter.post(
  "/login",
  [
    check("email", "This field is not a valid email").isEmail(),
    check("password", "Password is required").notEmpty(),
    fieldValidation,
  ],
  usersController.login,
);

export default usersRouter;
