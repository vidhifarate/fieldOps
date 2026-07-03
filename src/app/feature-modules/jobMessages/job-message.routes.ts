import { Router } from "express";
import { authorize } from "../../utilities/authorize.js";
import { body } from "../../validate.js";
import { ZCreateMessage } from "./job-message.types.js";
import jobMessagesService from "./job-messages.service.js";
import { ResponseHandler } from "../../utilities/response-handler.js";
import { Route } from "../routes/routes.types.js";

const router = Router();

router.post("/message/:jobId", authorize(["Technician","Dispatcher"]), body(ZCreateMessage), async (req, res, next)=>{
  try{
    req.body.job_id=req.params.jobId;
    const result= await jobMessagesService.saveMessage(req.body);
    res.send(new ResponseHandler(200,result))

  }catch(e){
    next(e);
  }
  
});

router.get("/:id/message",authorize(["Technician","Dispatcher"]),async(req,res,next)=>{
  try{
    const jobId=req.params.id as string
    const result= await jobMessagesService.getChatHistory(jobId);
    res.send(new ResponseHandler(200,result))


  }catch(e){
    next(e);
  }
});

export default new Route("/job-message",router)
