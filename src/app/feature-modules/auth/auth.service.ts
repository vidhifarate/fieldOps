import { compare } from "bcryptjs";
import { AuthResponses } from "./authResponses.js";
import { generateAccessToken, generateRefreshToken, verifyToken } from "../../utilities/token.js";
import { log } from "node:console";
import type { User } from "../user/user.types.js";
import userService from "../user/user.service.js";
import { Users } from "../user/user.schema.js";
import crypto from "crypto"
import { redis } from "../../connecions/redis.connection.js";
import userRepo from "../user/user.repo.js";
import { emailTemplates } from "../../utilities/aws/aws.services.js";
import type { Register } from "./auth.types.js";
import { userResponse } from "../user/user.responses.js";

export const login = async (credentials: Pick<User, "email" | "password">) => {
  try {

    const user = await userService.findOne({ email: credentials.email });
    if (!user) throw AuthResponses.USER_NOT_FOUND;

    console.log(user.password, credentials.password)

    const didMatch = await compare(credentials.password, user.password)
    console.log(didMatch)
    if (!didMatch) throw AuthResponses.INVALID_CREDENTIALS;

    const accessToken = await generateAccessToken(user.id, user.role);
    const refreshToken = await generateRefreshToken(user.id, user.role);

  
    const { password, ...userWithoutPassword } = user.toJSON();
    console.log("user logged in ");
    return { userWithoutPassword, accessToken, refreshToken };

  } catch (e) {
    throw e;
  }

};

export const register = async (user: User) => {
  try {

    const userExists = await userService.findOne({ email: user.email });
    if (userExists) throw AuthResponses.USER_ALREADY_EXISTS;

    const newUser = await userService.createUser(user);
    if (newUser) await emailTemplates.welcome(user.email)

    return newUser;

  } catch (e) {
    throw e;
  }
}

export const generateOTP = async (email: string) => {
  try {
    const userexists = await userService.findOne({ email: email });
    if (userexists) {
      return AuthResponses.USER_ALREADY_EXISTS;
    }

    const newUser = await userService.createUser({ name: "user", email: email, password: "password", role: "Default" });

    const otp = crypto.randomInt(100000, 999999).toString();
    const key = `otp:${email}`;

    await redis.setEx(key, 6000, otp);
    // await emailTemplates.otp(email, otp);

    console.log(`OTP: ${otp}`);
    return AuthResponses.OTP_SENT;

  } catch (e) {
    throw e;
  }
};


export const verifyOTP = async (email: string, inputOTP: string) => {
  try {
    const user = await userRepo.findOne({ email: email });
    if (!user) {
      throw AuthResponses.USER_NOT_FOUND
    };

    const key = `otp:${email}`;
    const originalOTP = await redis.get(key);
    if (!originalOTP) {
      throw AuthResponses.OTP_EXPIRED;
    }
    const validOTP = originalOTP === inputOTP;
    if (!validOTP) {
      throw AuthResponses.INVALID_OTP;
    }
    if (validOTP) console.log("--------valid otp -------")
    await redis.del(key);

    return AuthResponses.EMAIL_VARIFIED;

  } catch (e) {
    console.log(e);
    throw e;
  }
};


export const registerWithOTP = async (registerData: Register) => {
  try {
    const { email, password: inputPassword, otp } = registerData;

    const user = await userService.findOne({ email });
    if (!user) throw AuthResponses.USER_NOT_FOUND;

    const redisKey = `otp:${email}`;
    const storedOTP = await redis.get(redisKey);

    if (!storedOTP) throw AuthResponses.OTP_EXPIRED;
    if (storedOTP !== otp) throw AuthResponses.INVALID_OTP;

    await redis.del(redisKey);
    const newUser = await userService.registerUser(registerData) as Users


    const accessToken = await generateAccessToken(newUser.id, newUser.role);
    const refreshToken = await generateRefreshToken(newUser.id, newUser.role);

    const { password, ...userWithoutPassword } = newUser.toJSON();

    return { userWithoutPassword, accessToken, refreshToken };
  } catch (e) {
    console.log(e);
    throw e;
  }
};


export default { login, register, generateOTP, verifyOTP, registerWithOTP }