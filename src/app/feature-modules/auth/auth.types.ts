import z, { email } from "zod";

export const ZLogin = z.object({
  email: z.email({ message: "INVALID EMAIL" }),
  password: z.string()
});

export const ZRegister = z.object({
  name: z.string().min(1),
  email: z.string(),
  password: z.string(),
  role: z.enum(["Customer", "Technician", "Dispatcher"]),
  otp: z.string().min(6)
});

export const ZEmialVerify = z.object({
  email: z.email(),
  otp: z.string({ message: "MINIMUN 6 DIDGIT OTP REQUIRES" }).min(6).max(6).optional()
})


export type Register = z.infer<typeof ZRegister>;







