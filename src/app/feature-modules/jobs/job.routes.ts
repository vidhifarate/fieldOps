import { Router } from "express";
import { authenticate } from "../../utilities/authenticate.js";
import { authorize } from "../../utilities/authorize.js";
import jobServices from "./job.services.js";
import { body } from "../../validate.js";
import { ZCompleteJob, ZCreateJob, ZRSchedule, ZUpdateStatus } from "./job.types.js";
import { Route } from "../routes/routes.types.js";
import { ResponseHandler } from "../../utilities/response-handler.js";
import { imageUpload } from "../../utilities/multer-middleware.js";
import { uploadFile } from "../../utilities/aws/s3.services.js";

const router = Router();


router.post("/assign", authorize(['Dispatcher']), body(ZCreateJob), async (req, res, next) => {
  try {
    const result = await jobServices.createJob(req.body);
    res.send(new ResponseHandler(result.statusCode, result.messege));
  } catch (e) {
    throw e;

  }
});



router.patch("/:id/status", authorize(["Technician"]), body(ZUpdateStatus), async (req, res, next) => {
  try {
    const jobId = req.params.id as string;
    const userId = req.user?.id as string;
    const result = await jobServices.updateJobStatus(jobId, userId, req.body.status);

    res.send(new ResponseHandler(result.statusCode, result.messege));

  } catch (e) {
    next(e);
  }
});


router.patch("/:id/complete", authorize(["Technician"]), imageUpload.single("after_photo"), body(ZCompleteJob), async (req, res, next) => {
  try {
    const jobId = req.params.id as string;
    const fileName = `${jobId}_after_image_${Date.now()}`;
    const technician_id = req.user?.id as string;

    const key = await uploadFile(req.file!, fileName);
    req.body.jobId = jobId;
    req.body.after_photo = key;

    req.body.technician_id = technician_id;

    const result = await jobServices.completeJob(req.body);

    res.send(new ResponseHandler(result.statusCode, result.messege));
  }
  catch (e) {
    next(e)
  }
});


router.get("/view", authorize(["Technician", "Dispatcher"]), async (req, res, next) => {
  try {
    const id = req.user!.id;
    const role = req.user!.role as 'Technician' | 'Dispatcher';
    const result = await jobServices.getJobs(role, id);

    res.send(new ResponseHandler(200, result))


  } catch (e) {
    next(e);
  }
});


router.delete("/delete/:id", authorize(["Dispatcher"]), async (req, res, next) => {
  try {
    const id = req.params!.id as string;

    const result = await jobServices.softDelete(id)

    res.send(new ResponseHandler(result.statusCode, result))


  }
  catch (e) {
    next(e);
  }
});


router.patch("/:id/schedule", authorize(["Dispatcher"]), body(ZRSchedule), async (req, res, next) => {
  try {
    const jobId = req.params.id as string;
    const { technician_id, scheduled_at } = req.body

    const result = await jobServices.rescheduleJob(jobId, technician_id, scheduled_at);
    res.status(200).send(new ResponseHandler(result.statusCode, result));


  } catch (e) {
    next(e);
  }
});





// router.post("/messages",authenticate,authorize(['Technician','Dispatcher']),async(req,res,next)=>{
//   try{
//     const message= await addMessage.

//   }catch(e){
//     next(e)
//   }
// })




export default new Route("/jobs", router);













