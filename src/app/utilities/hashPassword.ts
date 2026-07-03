import { genSalt, hash } from "bcryptjs"

export const hashPassword = async(password:string)=>{
  try{
    const salt = await genSalt(5);
    const hashed = await hash(password,salt);
    return hashed;


  }catch(e){
    throw(e);
  }
}