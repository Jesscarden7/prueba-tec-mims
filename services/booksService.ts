import { Book } from "../database/models/Book";
import { responseType } from "../customTypes/responseType";

const booksService = {
  booksList: async (): Promise<responseType> => {
    const books = await Book.findAll();

    const response: responseType = {
      data: books,
      isSuccessful: true,
    };

    return response;
  },
};

export default booksService;

