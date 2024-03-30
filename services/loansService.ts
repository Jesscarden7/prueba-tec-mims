import { Loan } from "../database/models/Loan";
import { User } from "../database/models/User";
import { Book } from "../database/models/Book";
import { loanPayload } from "../customTypes/loanType";
import { responseType } from "../customTypes/responseType";

const loansService = {
  loanBook: async (loanData: loanPayload): Promise<responseType> => {
    const existingUser = await User.findByPk(loanData.userId);

    if (!existingUser) {
      const response: responseType = {
        isSuccessful: false,
        errorMessage: "Invalid user",
      };

      return response;
    }

    const existingBook = await Book.findByPk(loanData.bookId);

    if (!existingBook) {
      const response: responseType = {
        isSuccessful: false,
        errorMessage: "Invalid book",
      };

      return response;
    }

    const newLoan = await Loan.create(loanData);

    const response: responseType = {
      data: newLoan,
      isSuccessful: true,
    };

    return response;
  },
};

export default loansService;
