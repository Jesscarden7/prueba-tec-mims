import { Request, Response } from "express";
import { loanPayload } from "../customTypes/loanType";

import loansService from "../services/loansService";

const loansController = {
  loanBook: async (req: Request, res: Response) => {
    try {
      console.log(req.user);
      
      const loanData: loanPayload = {
        userId: parseInt(req.params.userId),
        bookId: parseInt(req.params.bookId),
        loanDate: req.body.loanDate,
      };

      const loanResult = await loansService.loanBook(loanData);

      if (!loanResult.isSuccessful) {
        return res.status(400).json({
          errorMessage: loanResult.errorMessage || "There was an error creating loan",
        });
      }

      return res.status(201).json(loanResult);
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        errorMessage: "Server error",
        isSuccessful: false,
      });
    }
  },
};

export default loansController;
