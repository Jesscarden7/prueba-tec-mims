import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { responseType } from "../customTypes/responseType";

const fieldValidation = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const response: responseType = {
      isSuccessful: false,
      errorMessage: errors.mapped() as unknown as string,
    };
    return res.status(400).json(response);
  }

  next();
};

export default fieldValidation;
