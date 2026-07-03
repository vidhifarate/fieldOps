import { Router } from "express";
import { body } from "../../validate.js";
import { ZEmialVerify, ZLogin, ZRegister } from "./auth.types.js";
import { ResponseHandler } from "../../utilities/response-handler.js";
import authService from "./auth.service.js";
import { Route } from "../routes/routes.types.js";


const router = Router();


router.post("/login", body(ZLogin), async (req, res, next) => {
  try {
    const { userWithoutPassword, accessToken, refreshToken } = await authService.login(req.body);
    res.cookie('accessToken', accessToken, { maxAge: 900000, httpOnly: true })
    res.cookie('refreshToken', refreshToken, { maxAge: 7 * 24 * 60 * 60 * 1000, httpOnly: true })

    res.send(new ResponseHandler(200, userWithoutPassword, null));

  } catch (e) {
    next(e)
  }

});

router.post('/request-otp', async (req, res, next) => {
  try {
    const email = req.body.email;
    const result = await authService.generateOTP(email);
    res.status(result.statusCode).send(new ResponseHandler(result.statusCode, result.message,));
  } catch (e) {
    next(e)

  }
})

router.post("/verfy-email", body(ZEmialVerify), async (req, res, next) => {
  try {
    const email = req.body.email as string;
    const otp = req.body.otp as string;

    const result = await authService.verifyOTP(email, otp);

    res.status(result.statusCode).send(new ResponseHandler(result.statusCode, result.message));
  } catch (e) {
    next(e);
  }
});


router.post("/register", body(ZRegister), async (req, res, next) => {
  try {
    req.body.created_by = req.user?.id
    const result = await authService.register(req.body);
    res.send(new ResponseHandler(result.statusCode, result))

  } catch (e) {
    console.log(e)
    next(e);
  }
});

router.post("/register-with-otp", body(ZRegister), async (req, res, next) => {
  try {

    const { userWithoutPassword, accessToken, refreshToken } = await authService.registerWithOTP(req.body);

    res.cookie('accessToken', accessToken, { maxAge: 900000, httpOnly: true });
    res.cookie('refreshToken', refreshToken, { maxAge: 7 * 24 * 60 * 60 * 1000, httpOnly: true });

    res.status(200).send(new ResponseHandler(200, userWithoutPassword));
  } catch (e) {
    console.log(e);
    next(e);
  }
});








export default new Route("/auth", router)