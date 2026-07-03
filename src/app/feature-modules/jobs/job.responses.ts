export const JobResponses :Record<"JOB_ASSIGNED"|"JOB_ASSIGNMENT_FAILED"|"JOB_NOT_FOUND"|"JOB_STATUS_UPDATED"|"JOB_COMPLETED"|"SOMETHING_WENT_WRONG"|"JOB_DELETED"|"JOB_ALREDY_ASSIGNED"|"JOB_RESCHEDULED",{statusCode:number,messege:string}> = {
  "JOB_ASSIGNED":{
    statusCode:200,
    messege:"JOB ASSIGNED "

  },
  "JOB_ASSIGNMENT_FAILED":{
    statusCode:400,
    messege:"JOB ASSIGNMENT FAILED "
  },
 "JOB_NOT_FOUND":{
   statusCode:400,
  messege:" JOB NOT FOUND "
 },
 "JOB_STATUS_UPDATED":{
  statusCode:200,
  messege:"JOB STATUS UPDATED"
 },
 "JOB_COMPLETED":{
  statusCode:200,
  messege:"JOB COMPLETED"
 }
 ,
 SOMETHING_WENT_WRONG:{
  statusCode:400,
  messege:"SOMETHING WENT WRONG "
 },
 "JOB_DELETED":{
  statusCode:200,
  messege:"JOB DELETED"
 },
 "JOB_ALREDY_ASSIGNED":{
  statusCode:409,
  messege:"JOB ALREADY ASSIGNED "
 },
 JOB_RESCHEDULED:{
  statusCode:200,
  messege:"JOB RESCHEDULED"
 }

}


