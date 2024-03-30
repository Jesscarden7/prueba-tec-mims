import express, { Express, Request, Response, Application } from "express";
import usersRouter from "./routes/users.routes";
import booksRouter from "./routes/books.routes";
import loansRouter from "./routes/loans.routes";
import { sequelize } from "./database/conection";
import swaggerjsdoc from 'swagger-jsdoc';
import swaggerui from 'swagger-ui-express';

import "./database/models/User"
import "./database/models/Book"
import "./database/models/Loan"

async function main() {
  try {
    const app: Application = express();

    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    const options = {
      definition: {
        openapi: "3.0.1",
        info: {
          title: "REST API for library system",
          version: "1.0.0",
          contact: {
            name: "Jess Library",
            url: "https://www.google.com/?hl=es",
            email: "jessica@libray.com"
          }
        },
        schemes: ["http", "https"],
        servers: [{ url: "http://localhost:3000/" }],
      },
      apis: [
        "./routes/*.ts",
        "./dist/routes/*.js",
      ],
    };
    
    const spacs = swaggerjsdoc(options)
    
    app.use("/api-docs",
      swaggerui.serve,
      swaggerui.setup(spacs)
    )

    app.use("/api/auth", usersRouter);
    app.use("/api/books", booksRouter);
    app.use("/api/loans", loansRouter);


    app.get("/", (req: Request, res: Response) => {
      res.send("Service avaliable");
    });

    await sequelize.sync();

    app.listen(3000, () => {
      console.log("Server running in port 3000");
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

main();
