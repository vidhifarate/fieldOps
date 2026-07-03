import { Router } from "express";
import { authenticate } from "../../utilities/authenticate.js";
import { authorize } from "../../utilities/authorize.js";
import userService from "./user.service.js";
import { ResponseHandler } from "../../utilities/response-handler.js";
import { Route } from "../routes/routes.types.js";

const router = Router();


// router.get("/view/technician-summary",authenticate,authorize(['Dispatcher']),async(req,res,next)=>{
//   try{
//     const technicianId= req.body.technician_id

//     const result = await userService.findTechnicianSummaryWithJobs(technicianId);
//     res.send(new ResponseHandler(200,result));


//   }catch(e){
//     next(e);
//   }
// });


router.delete('/delete/:id', authorize(["Customer", "Dispatcher"]), async (req, res, next) => {

  try {
    const id = req.params?.id as string;
    const result = await userService.softDelete(id);
    console.log("resultttt----------", result)
    res.send(new ResponseHandler(result.statusCode, result.messege));

  } catch (e) {
    next(e);

  }
})

router.get("/technician-job-Summary", authorize(['Dispatcher', 'Technician']), async (req, res, next) => {
  try {
    const userId = req.user?.id as string;
    const role = req.user?.role as 'Dispatcher' | 'Technician';
    const result = await userService.allTechnicianJobSummary(role, userId);
    res.send(result);
  } catch (e) {
    next(e);
  }
})

export default new Route("/users", router)