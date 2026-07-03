import { Router } from "express";
import serviceRequestRepo from "./serviceRequest.repo.js";
import serviceRequestService from "./serviceRequest.service.js";
import { body } from "../../validate.js";
import { ZCreateRequest } from "./serviceRequest.types.js";
import { authenticate } from "../../utilities/authenticate.js";
import { Route } from "../routes/routes.types.js";
import { imageUpload } from "../../utilities/multer-middleware.js";
import { date } from "zod";
import { uploadFile } from "../../utilities/aws/s3.services.js";
import { authorize } from "../../utilities/authorize.js";
import { ResponseHandler } from "../../utilities/response-handler.js";

const router = Router();

router.post("/add", authorize(["Customer"]),imageUpload.single('photo'), body(ZCreateRequest), async (req, res, next) => {
  try {

    const customer_id = req.user?.id;
    const fileName = `${customer_id}_before_image_${Date.now()}`;
    req.body.customer_id = customer_id;
    const key = await uploadFile(req.file!, fileName);
    req.body.photo = key;
    req.body.created_by = customer_id;
    const result = await serviceRequestService.createRequest(req.body);
    res.send(new ResponseHandler(result.statusCode,result.messege));
  } catch (e) {
    console.log("errorr-----------------", e)
    next(e)
  }
});


router.get("/view",authorize(["Customer","Dispatcher"]),async(req,res,next)=>{
  try{
    const id=req.user!.id;
    const role =req.user!.role as  'Customer'|'Dispatcher';

    const result= await serviceRequestService.getRequests(role,id);
 
    res.send(new ResponseHandler(200,result))


  }catch(e){
    next(e);
  }
});

router.delete('/delete/:id',authorize(["Customer","Dispatcher"]),async(req,res,next)=>{

  try{
    const id =req.params?.id as string;
    const result =await  serviceRequestService.softDelete(id );
    res.send(new ResponseHandler(result.statusCode,result.messege));

  }catch(e){
    next(e);

  }
})






export default new Route("/service-requests", router)