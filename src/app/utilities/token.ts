import type { UUID } from "crypto";
import fs from "fs";
import jwt from "jsonwebtoken"

const privateKey = fs.readFileSync("private.key", 'utf8')
const publicKey = fs.readFileSync("public.key", 'utf8');

export const generateAccessToken = async (id: string, role: string) => {
  try{
      const token = await jwt.sign({ id: id, role: role },
    privateKey,
    {
      algorithm: "RS256",
      expiresIn: "1d"
    });
  return token;

  }
  catch(e){
    throw(e);
  }

}


export const generateRefreshToken = async (id: string, role: string) => {
  try{
      const token = await jwt.sign({ id, role },
    privateKey,
    {
      algorithm: "RS256",
      expiresIn: "7d"
    });
  return token;

  }catch(e){
    throw(e);
  }

}

export const verifyToken = (token: string) => {
try{
  const decoded = jwt.verify(token,
    publicKey, {
    algorithms: ["RS256"],
    complete: true
  }) as jwt.JwtPayload

  return decoded;
}catch(e){
  throw(e);
}

}


export default {
  verifyToken, 
  generateAccessToken, 
  generateRefreshToken
}