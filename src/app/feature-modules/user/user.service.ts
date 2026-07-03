import { callbackify } from "node:util";
import { hashPassword } from "../../utilities/hashPassword.js";
import userRepo from "./user.repo.js"
import { userResponse } from "./user.responses.js";
import type { Users } from "./user.schema.js"
import type { CreateUser, User } from "./user.types.js"

const createUser = async(user:CreateUser)=>{
  try{
   const hashed= await hashPassword(user.password!);
    const newUser = await userRepo.create({...user, password: hashed},);
  
    return userResponse.USER_CREATED;

  }catch(e){
    throw(e);
  }
}
export const findOne=async(user:Partial<Users>)=>{
  try{
    
    console.log("in user servicesss")
      const userExists =   userRepo.findOne(user);
      // if(!userExists)return userResponse.USER_NOT_FOUND;
      return userExists


  }catch(e){
   throw(e)
  }
}


export const findTechnicianSummaryWithJobs = async(technicianId:string)=>{
  try{
    const userExists = await userRepo.findOne({id:technicianId});
    if(!userExists)return userResponse.USER_NOT_FOUND;
    const isTechnician= userExists.role==="Technician"
    if(!isTechnician)return userResponse.USER_NOT_FOUND;
    const result = await userRepo.getTechnicianSummary(technicianId);
    return result;

  }catch(e){
    console.log(e);
    throw(e)
  }
}

const softDelete  = async(userid:string)=>{
  try{
    const user = await userRepo.findOne({id:userid});
    if(!user)return userResponse.USER_NOT_FOUND;
    user.deleted_at= Date.now() as unknown as string;
    user.save();

    return userResponse.USER_DELETED;
  }catch(e){
    throw(e)
  }

};


const allTechnicianJobSummary = async(role:'Dispatcher'|'Technician',id:string)=>{
  try{

  
    
    if (role==='Technician'){
      return await userRepo.getTechnicianSummary(id); 
    }
    
    const technicians = await userRepo.findAll({role:'Technician'});
    const summary =[];
    for(const technician of technicians){
      const result = await userRepo.getTechnicianSummary(technician.id);
      summary.push(result);
    }
    return summary


  }catch(e){
    throw (e)
    
  }
};

const registerUser= async(user:CreateUser)=>{
  try{
       const userExists = await userRepo.findOne({email:user.email});
       if(!userExists)return userResponse.USER_NOT_FOUND;
        const hashed = await hashPassword(user.password!);
       user.password= hashed;

       await userExists.update({name:user.name,password:user.password,role:user.role})
     const updatedUser =  await userExists.save();

      return updatedUser;




  }catch(e){
    throw(e);
  }
}

export default {
  createUser,
  findOne,
  findTechnicianSummaryWithJobs,
  softDelete,
  allTechnicianJobSummary,
  registerUser
}










