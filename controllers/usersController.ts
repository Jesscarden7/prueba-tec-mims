import { Request, Response } from "express";
import { registerPayload } from "../customTypes/registerType";
import { loginPayload } from "../customTypes/loginType";

import usersService from "../services/usersService";

const usersController = {
  register: (req: Request, res: Response) => {
    try {
      const registerResult = usersService.register(req.body as registerPayload);

      if (!registerResult.isSuccesful) {
        return res.status(400).json({
          error:
            registerResult.errorMessage || "There was an error creating user",
        });
      }

      return res.status(201).json(registerResult);
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Server error",
      });
    }
  },
  login: (req: Request, res: Response) => {
    try {
      const loginResult = usersService.login(req.body as loginPayload);
      return res.status(200).json(loginResult);
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Server error",
      });
    }
  },
};

export default usersController;
