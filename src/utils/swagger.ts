import { Express, Request, Response } from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const port = process.env.PORT || 2000;

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",

    info: {
      title: "Epicure API docs",
      version: "v1",
      description: "this is the API for the BackEnd server of Epicure",
    },
  },
  servers: [
    {
      url: `http://localhost:${port}`,
    },
  ],

  apis: ["src/routes/**/*.ts", "src/mongoDB/models/*.ts"],
};

const swaggerSpec = swaggerJsdoc(options);

export function swaggerDocs(app: Express, port: number | string) {
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  app.get("docs.json", (req: Request, res: Response) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });

  console.log(`docs available at http://localhost:${port}/docs`);
}
