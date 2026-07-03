import z, { email } from "zod";

export const ZUser = z.object({
  name:z.string().min(1),
  email:z.email({message:"INVALID EMAIL "}),
  password:z.string().min(5),
  role:z.enum(['Customer','Technician','Dispatcher','Default'])
});
export const ZCreateUser = z.object({
  name:z.string().min(1),
  email:z.email({message:'INVALID EMAIL '}),
  password:z.string().min(5),
  role:z.enum(['Customer','Technician','Dispatcher','Default'])
})

export type  User = { name: string; email: string; password: string; role: "Customer" | "Technician" | "Dispatcher" | "Default"; }

export const ZUserUpdate=z.object({
    name:z.string().min(1),
    password:z.string(),
    role:z.enum(["Customer","Technician","Dispatcher"]),
    otp:z.string().min(6)
});

export type Update = z.infer<typeof ZUserUpdate>;

// export type User = z.infer<typeof ZUser>
export type CreateUser = z.infer<typeof ZCreateUser>