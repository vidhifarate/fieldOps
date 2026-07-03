import { json, type Application } from "express";
import helmet from "helmet";
import cookieParser from "cookie-parser"
import { routes } from "./routes.data.js";
import type { Request, Response, NextFunction } from "express";
import { ResponseHandler } from "../../utilities/response-handler.js";
import { authenticate } from "../../utilities/authenticate.js";


const publicRoutes = ['/auth'];

export const registerMiddleware = (app: Application) => {
  app.use(json());
  app.use(helmet());
  app.use(cookieParser());



  for (const route of routes) {
    if (publicRoutes.includes(route.path)) {
      app.use(route.path, route.router);
    } else {
      app.use(route.path, authenticate, route.router);
    }
  }

  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    const statusCode = typeof err.statusCode === "number" ? err.statusCode : 500;
    res.status(statusCode).send(new ResponseHandler(null, err));

  })
}


