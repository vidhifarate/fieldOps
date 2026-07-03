import z from "zod";

export const ZCreateJob = z.object({
    service_request_id: z.string(),
    description: z.string().optional(),
    technician_id: z.string(),
    status: z.enum(['assigned', 'en route', 'in progress', 'completed']),
    scheduled_at: z.string()

});

export const ZJob = z.object({
    service_request_id: z.string(),
    description: z.string().optional(),
    technician_id: z.string(),
    status: z.enum(['assigned', 'en route', 'in progress']),
    scheduled_at: z.string()
});

export const ZUpdateStatus = z.object({
    status: z.enum(["en route", "in progress"])
});

export const ZCompleteJob = z.object({
    summary: z.string(),

});

export const ZRSchedule= z.object({
  
    technician_id:z.string().min(1),
    scheduled_at :z.string().min(1)



})

export type Complete = { jobId: string, after_photo: string, technician_id: string, summary: string, }



export type CreateJob = z.infer<typeof ZCreateJob>;
export type Job = z.infer<typeof ZJob>
