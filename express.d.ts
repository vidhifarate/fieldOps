import type { Payload } from "./src/app/utilities/authenticate.ts"

declare global {
declare namespace Express {
   export interface Request {
      user?:Payload
   }
}

}

export {

}