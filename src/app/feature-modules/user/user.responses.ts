export const userResponse :Record<"USER_NOT_FOUND"|"USER_ALREDAY EXISTS"|"USER_CREATED"|"USER_DELETED",{statusCode:number,messege:string}> = {
  "USER_NOT_FOUND":{
    statusCode:404,
    messege:"user not found"

  },

  "USER_ALREDAY EXISTS":{
    statusCode:400,
    messege:"user already exists "
  },

  "USER_CREATED":{
    statusCode:201,
    messege:"user created successfully"
  },
  "USER_DELETED":{
    statusCode:200,
    messege:"USER DELETED"
  }


}


