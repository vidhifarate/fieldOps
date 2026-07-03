import { io } from "../../utilities/sockets.js";
import { JobMessage } from "./job-message.schemas.js";
import type { createMessage } from "./job-message.types.js";
import jobMessagesRepo from "./job-messages.repo.js";
import { JobMessageResponses } from "./job-messages.responses.js";



const saveMessage = async(message:createMessage)=>{
  try{
    const savedMessage= await jobMessagesRepo.create(message);
    io.to(`job_${message.job_id}`).emit("new_message", savedMessage.toJSON());
    return savedMessage;

  }catch(e){
    throw(e);
  }
}



const getChatHistory= async(jobId: string)=> {
    try{

      const chatHistory= await jobMessagesRepo.findAll(jobId);
      if(chatHistory.length===0)return JobMessageResponses.NO_MESSAGES_FOUND
      return chatHistory

    }catch(e){
      throw(e);

    }
  };


  export default {
    getChatHistory,
    saveMessage
  }
