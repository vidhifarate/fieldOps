
export const AuthResponses: Record<"USER_NOT_FOUND" | "INVALID_CREDENTIALS" | "USER_ALREADY_EXISTS"|"USER_CREATED_SUCCESSFULLY"|"OTP_SENT"|"OTP_EXPIRED"|"INVALID_OTP"|"EMAIL_VARIFIED", { statusCode: number, message: string }> = {
  USER_NOT_FOUND: {
    statusCode: 404,
    message: "USER NOT FOUND"
  },
  INVALID_CREDENTIALS: {
    statusCode: 400,
    message: "INVALID CREDENTIALS"
  },
  USER_ALREADY_EXISTS: {
    statusCode: 400,
    message: "USER ALREADY EXISTS"
  },
  USER_CREATED_SUCCESSFULLY:{
    statusCode:200,
    message:"USER CREATED SUCCESSFULLY "
  },
  OTP_SENT:{
    statusCode:200,
    message:"otp sent"
  },
  OTP_EXPIRED:{
    statusCode:400,
    message:"OTP EXPIRED"
  },
  INVALID_OTP:{
    statusCode:400,
    message:"INVALID OTP"
  },
  EMAIL_VARIFIED:{
    statusCode:200,
    message:"EMAIL VARIFIED"
  }


}