import type { Request, Response, NextFunction } from "express";
import { ResponseHandler } from "./response-handler.js";

export const authorize = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user|| !req.user.id|| !req.user.role) {
        return res.send(new ResponseHandler(401, null, "UNAUTHORIZED: TOKEN NOT PROVIDED "));
      }
      if (!allowedRoles.includes(req.user.role)) {
        return res.send(new ResponseHandler(403, null, "ACESS DEBIED : UNAUTHORIED ACCESS "));
      }
      next();
    } catch (e) {
      next(e);
    }
  };
};

