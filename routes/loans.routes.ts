/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     loanPayload:
 *       type: object
 *       required:
 *         - loanDate
 *       properties:
 *         loanDate:
 *           type: string
 *           description: Date where the loan was made on
 *       example:
 *           loanDate: 2024-03-30
 */

/**
 * @swagger
 * tags:
 *   name: Loans
 *   description: The loans managing API
 * /api/loans/{userId}/{bookId}:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Creates a new loan
 *     parameters:
 *       - in: path
 *         name: userId
 *         type: integer
 *         required: true
 *         description: user identifier
 *       - in: path
 *         name: bookId
 *         type: integer
 *         required: true
 *         description: book identifier
 *     tags: [Loans]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/loanPayload'
 *     responses:
 *       201:
 *         description: The created loan.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ResponseType'
 *       400:
 *         description: Invalid loan data
 *       403:
 *         description: Invalid token
 *       500:
 *         description: Some server error
 */

import express, { Router } from "express";
import verifyToken from "../middlewares/tokenValidator";

declare global {
  namespace Express {
    interface Request {
      user?: string;
    }
  }
}

const loansRouter: Router = express.Router();

import loansController from "../controllers/loansController";

loansRouter.post("/:userId/:bookId", verifyToken, loansController.loanBook);

export default loansRouter;
