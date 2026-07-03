import { emailTemplates } from "../../utilities/aws/aws.services.js";
import { getPreSignedURL } from "../../utilities/aws/s3.services.js";
import serviceRequestRepo from "../service-request/serviceRequest.repo.js";
import userService from "../user/user.service.js";
import jobRepo from "./job.repo.js";
import { JobResponses } from "./job.responses.js";
import type { Complete, CreateJob } from "./job.types.js";

const createJob = async (job: CreateJob) => {
  try {
    const alreadyExists = await jobRepo.findOne({ service_request_id: job.service_request_id });
    if (alreadyExists) return JobResponses.JOB_ALREDY_ASSIGNED;
    const newJob = await jobRepo.create(job);
    return JobResponses.JOB_ASSIGNED;

  } catch (e) {
    throw (e);
  }
}

const updateJobStatus = async (job_id: string, technician_id: string, status: string
) => {
  try {
    const job = await jobRepo.findOne({
      id: job_id,
      technician_id,
    });

    job!.status = status;
    await job!.save();
  

    return JobResponses.JOB_STATUS_UPDATED;
  } catch (e) {
    throw e;
  }
}



const completeJob = async (complete: Complete) => {
  try {
    const job = await jobRepo.findOne({ id: complete.jobId });
    if (!job) return JobResponses.JOB_NOT_FOUND;
    if (job.technician_id !== complete.technician_id) return JobResponses.JOB_NOT_FOUND;

    job.status = 'completed';
    job.summary = complete.summary
    await job.save();
    await jobRepo.update(job.id, { status: "completed" });
    console.log("updated to complete ----------")

    const serviceRequest = await serviceRequestRepo.findOne({ id: job.service_request_id });
    const technician = await userService.findOne({ id: complete.technician_id });
    const customer = await userService.findOne({ id: serviceRequest!.customer_id });
    if (!technician || !customer || !serviceRequest) return { statusCode: 400, messege: "something went wrong " }



    await emailTemplates.jobCompleted(serviceRequest.title, job.created_by, technician.email, customer.email)

    return JobResponses.JOB_COMPLETED;


  } catch (e) {
    throw (e);
  }
};


const getJobs = async (role: "Technician" | "Dispatcher", id: string) => {
  try {

    let filter = {};
    switch (role) {
      case 'Technician': {
        filter = { technician_id: id }
        break;
      };
      case 'Dispatcher': {
        filter = {}
        break;
      }
    }

    const requests = await jobRepo.findAll(filter);

    const formatedData: any[] = [];
    for (const request of requests) {

      if (request.after_photo) {
        const url = await getPreSignedURL(request.after_photo);
        request.after_photo = url!;
      }

      const { id, technician_id, scheduled_at, after_photo, ...restOfRequest } = request
      formatedData.push({ id, technician_id, scheduled_at, after_photo });

    }
    return formatedData;

  } catch (e) {
    throw (e);
  }
}

const softDelete = async (jobId: string) => {
  try {

    const job = await jobRepo.findOne({ id: jobId });
    if (!job) return JobResponses.JOB_NOT_FOUND;

    job.deleted_at = Date.now() as unknown as string;
    job.save();

    return JobResponses.JOB_DELETED;
  } catch (e) {
    throw (e)
  }

}

const rescheduleJob = async (jobId: string, technician_id: string, scheduled_at: string) => {
  try {
    const job = await jobRepo.findOne({ id: jobId });
    if (!job) return JobResponses.JOB_NOT_FOUND;

    await job.update({
      technician_id: technician_id,
      scheduled_at: scheduled_at
    });

    await job.save();

    return JobResponses.JOB_RESCHEDULED;
  } catch (e) {
    throw (e)
  }

}


export default {
  createJob,
  updateJobStatus,
  completeJob,
  getJobs,
  softDelete,
  rescheduleJob
}










