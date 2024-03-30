import { Request, Response, NextFunction } from "express";
import { responseType } from "../customTypes/responseType";
import jwt, { Secret, JwtPayload } from "jsonwebtoken";

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const bearerToken = req.headers["authorization"];

  if (!bearerToken) {
    const response: responseType = {
      isSuccessful: false,
      errorMessage: "A token is required for authentication",
    };
    return res.status(403).json(response);
  }

  const actualToken = bearerToken.split(" ")[1];
  
  try {
    const SECRET_KEY: Secret = "itsasecret";

    const decoded = jwt.verify(actualToken, SECRET_KEY);
    req.user = decoded as string;

    next();
  } catch (err) {
    console.log(err);
    return res.status(401).send({
      type: "error",
      message: "Invalid Token",
    });
  }
};

export default verifyToken;
