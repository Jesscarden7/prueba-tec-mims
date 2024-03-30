import { Request, Response } from "express";
import { registerPayload } from "../customTypes/registerType";
import { loginPayload } from "../customTypes/loginType";

import usersService from "../services/usersService";

const usersController = {
  register: async (req: Request, res: Response) => {
    try {
      const registerResult = await usersService.register(
        req.body as registerPayload,
      );

      if (!registerResult.isSuccessful) {
        return res.status(400).json({
          errorMessage:
            registerResult.errorMessage || "There was an error creating user",
        });
      }

      return res.status(201).json(registerResult);
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        errorMessage: "Server error",
        isSuccessful: false
      });
    }
  },
  login: async (req: Request, res: Response) => {
    try {
      const loginResult = await usersService.login(req.body as loginPayload);

      if (!loginResult.isSuccessful) {
        return res.status(400).json({
          errorMessage: loginResult.errorMessage || "There was an error loging",
        });
      }

      return res.status(200).json(loginResult);
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        errorMessage: "Server error",
        isSuccessful: false
      });
    }
  },
};

export default usersController;
