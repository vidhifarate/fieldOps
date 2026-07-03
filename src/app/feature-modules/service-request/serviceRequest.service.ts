import { ResponseHandler } from "../../utilities/response-handler.js";
import { emailTemplates } from "../../utilities/aws/aws.services.js";
import { getPreSignedURL } from "../../utilities/aws/s3.services.js";
import userRepo from "../user/user.repo.js";
import userService from "../user/user.service.js";
import serviceRequestRepo from "./serviceRequest.repo.js";
import { RequestResponses } from "./serviceRequest.responses.js";
import { ServiceRequest } from "./serviceRequest.schema.js";
import type { CreateRequest, Request } from "./serviceRequest.types.js";

const createRequest = async (request: Request) => {
  try {
    const user = await userService.findOne({ id: request.customer_id });
    const email = user!.email

    const newRequest = await serviceRequestRepo.create(request);
    await emailTemplates.welcome(email)
    return RequestResponses.REQUEST_SENT;

  } catch (e) {
    console.log("errorr-----------------", e)

    throw (e);
  }
}


const getRequests = async (role: 'Customer'|'Dispatcher', id: string) => {
  try {
    let filter = {};
    switch (role) {
      case 'Customer': {
        filter = { customer_id: id }
        break;
      };
      case 'Dispatcher': {
        filter = {}
        break;
      }
    }

    const requests = await serviceRequestRepo.findAll(filter);
    const formatedData: any[] = [];
    for (const request of requests) {
      const url = await getPreSignedURL(request.photo);
      request.photo = url!;
      const { id, title, urgency, photo, ...restOfRequest } = request
     formatedData.push({id, title, urgency, photo});
    
    }
 return formatedData;
  } catch (e) {
    console.log(e)
    throw e;

  }
}


const softDelete  = async(requestid:string)=>{
  try{
    const request = await serviceRequestRepo.findOne({id:requestid});
    if(!request)return RequestResponses.REQUEST_NOT_FOUND;

    request.deleted_at= Date.now() as unknown as string;
    request.save();

    return RequestResponses.REQUEST_DELETED;



  }catch(e){
    throw(e)
  }

}



export default {
  createRequest, getRequests,softDelete
}

