import z from "zod";

export const ZAddress= z.object({
  line1:z.string().min(1),
  line2:z.string().optional(),
  city:z.string().min(1),
  state:z.string().min(1),
  customer_id:z.uuid()
  
});

export const ZCreateAddress=z.object({
line1:z.string().min(1),
  line2:z.string().optional(),
  city:z.string().min(1),
  state:z.string().min(1),
});

export type Address= z.infer<typeof ZAddress>;