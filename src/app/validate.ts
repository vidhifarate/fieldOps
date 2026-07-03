import type { Request, Response, NextFunction } from "express"
import type { ZodObject } from "zod"

export const check = (type: "body" | "params" | "query") => {
  return (schema: ZodObject) => {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        console.log(req[type]);
        req[type] = schema.parse(req[type]);
        next();
      }
      catch (e: any) {
        const error: any = { statusCode: 400, message: "BAD REQUEST", error: e.issues };
        next(error);

      }
    }
  }
}


export const body = check("body");
export const params = check("params");
export const query = check("query");

