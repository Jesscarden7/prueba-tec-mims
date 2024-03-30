
/**
 * @swagger
 * tags:
 *   name: Books
 *   description: The Books list API
 * /api/books/:
 *   get:
 *     summary: List all books
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: The book list.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ResponseType'
 *       500:
 *         description: Some server error
 */

import express, { Router } from "express";

const booksRouter: Router = express.Router();

import booksController from "../controllers/booksController";

booksRouter.get("/", booksController.booksList);

export default booksRouter;
