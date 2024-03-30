import { User } from "../database/models/User";
import { registerPayload } from "../customTypes/registerType";
import { loginPayload } from "../customTypes/loginType";
import { responseType } from "../customTypes/responseType";

import bcrypt from "bcryptjs";
import jwt, { Secret, JwtPayload } from "jsonwebtoken";

const usersService = {
  register: async (user: registerPayload): Promise<responseType> => {
    const existingUser = await User.findOne({
      where: { email: user.email },
    });

    if (existingUser) {
      const response: responseType = {
        isSuccessful: false,
        errorMessage: "The email is not avaliable",
      };

      return response;
    }

    const hashedUser = {
      ...user,
      password: await bcrypt.hash(user.password, 12),
    };

    const newUser = (await User.create(hashedUser)) as any;
    // Skip password in response
    newUser.password = undefined;

    const response: responseType = {
      data: newUser,
      isSuccessful: true,
    };

    return response;
  },

  login: async (user: loginPayload): Promise<responseType> => {
    const existingUser = (await User.findOne({
      where: { email: user.email },
    })) as any;

    if (!existingUser) {
      const response: responseType = {
        isSuccessful: false,
        errorMessage: "Wrong email and/or password",
      };

      return response;
    }

    const SECRET_KEY: Secret = "itsasecret";

    const token = jwt.sign(
      {
        userid: existingUser.id,
        name: existingUser.name,
      },
      SECRET_KEY,
      {
        expiresIn: "12h",
      },
    );

    // Skip password in response
    existingUser.password = undefined;

    const response: responseType = {
      data: {
        token,
        user: existingUser
      },
      isSuccessful: true,
    };

    return response;
  },
};

export default usersService;
