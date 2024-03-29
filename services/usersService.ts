import { registerPayload } from "../customTypes/registerType";
import { loginPayload } from "../customTypes/loginType";
import { responseType } from "../customTypes/responseType";

const usersService = {
  register: (user: registerPayload): responseType<string> => {
    const response: responseType<string> = {
      data: "Soy register",
      isSuccesful: true
    }  
    return response;
  },

  login: (user: loginPayload): string => {
    return "Soy login";
  },
};

export default usersService;
