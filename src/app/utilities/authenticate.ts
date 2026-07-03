import type { NextFunction, Request, Response } from "express"
import { access } from "node:fs";
import { verifyToken } from "./token.js";
import { ResponseHandler } from "./response-handler.js";

export interface Payload{
id:string,
role:string,
version:number

}


export const authenticate = async (req: Request, res: Response, next: NextFunction) => {

   try {  
      const header = req.headers.authorization;
     const accessToken =header?.split(" ")[1] || req.cookies.accessToken;
     if(! accessToken)return res.send(new ResponseHandler(404,'Token not found '));
      const decoded = await verifyToken(accessToken);
      console.log("acess token", decoded)
      if(!decoded)throw new Error ('User not authenticated');
      const payload = decoded.payload as Payload;
      req.user = payload;

next();

   } catch (e) {
      console.log(e);
      next(e);
   }

}
