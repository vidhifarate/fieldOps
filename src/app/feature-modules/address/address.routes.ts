import { Router } from "express";
import { body } from "../../validate.js";
import { ZAddress, ZCreateAddress } from "./address.types.js";
import addressServices from "./address.services.js";
import { authenticate } from "../../utilities/authenticate.js";
import { ResponseHandler } from "../../utilities/response-handler.js";
import { Route } from "../routes/routes.types.js";
import { authorize } from "../../utilities/authorize.js";

const router = Router();

router.post("/add", authorize(['Customer', 'Dispatcher']), body(ZCreateAddress), async (req, res, next) => {
  try {
    req.body.user_id = req.user?.id
    const result = await addressServices.createAddress(req.body)
    res.send(new ResponseHandler(200, result));
  } catch (e) {
    console.log(e);
    next(e);
  }
});


router.get("/view", authorize(['Customer', 'Dispatcher']), async (req, res, next) => {
  try {
    const id = req.user!.id;
    const role = req.user!.role as 'Customer' | 'Dispatcher';

    const result = await addressServices.getAddresses(role, id);
    res.send(new ResponseHandler(200, result));

  } catch (e) {
    next(e)
  }
}
);



export default new Route("/address", router)