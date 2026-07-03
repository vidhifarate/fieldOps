export const AddressResponses :Record<"ADDRESS_CREATED"|"ADDRESS_NOT_FOUND",{statusCode:number,messege:string}> = {
  "ADDRESS_CREATED":{
  statusCode:200,
  messege:"JOB DELETED"
 },
 "ADDRESS_NOT_FOUND":{
  statusCode:404,
  messege:"ADDRESS NOT FOUND"
 }

}


