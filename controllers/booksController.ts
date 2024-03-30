import { Request, Response } from "express";

import booksService from "../services/booksService";

const booksController = {
  booksList: async (req: Request, res: Response) => {
    try {
      const listResult = await booksService.booksList();

      if (!listResult.isSuccessful) {
        return res.status(400).json({
          erroerrorMessager: listResult.errorMessage || "There was an error listing books",
        });
      }

      return res.status(200).json(listResult);
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        errorMessage: "Server error",
        isSuccessful: false
      });
    }
  },
};

export default booksController;
