
export const RequestResponses :Record<"REQUEST_SENT"|"REQUEST_FAILED"|"REQUEST_NOT_FOUND"|"REQUEST_DELETED",{statusCode:number,messege:string}> = {
  "REQUEST_SENT":{
    statusCode:200,
    messege:"REQUEST SENT "

  },
  "REQUEST_FAILED":{
    statusCode:400,
    messege:"REQUEST FAILED "
  },
  "REQUEST_NOT_FOUND":{
    statusCode:404,
    messege:"REQUEST NOT FOUND"
  },
  "REQUEST_DELETED":{
    statusCode:200,
    messege:"REQUEST DLETED"
  }
}


