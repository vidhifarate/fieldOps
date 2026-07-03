import z from "zod";

export const ZCreateRequest = z.object({
     title: z.string().min(1),
     description: z.string().optional(),
     address_id: z.string().uuid(),
     urgency: z.enum(['high','mid','low']),
   
     
});


export const ZRequest = z.object({
     title: z.string().min(1),
     description: z.string().optional(),
     address_id: z.string(),
     urgency: z.enum(['high','mid','low']),
     customer_id:z.string(),
     photo:z.string().min(1),
     date:z.string().datetime()

     
});



export type CreateRequest= z.infer<typeof ZCreateRequest>
export type Request= z.infer<typeof ZRequest>
