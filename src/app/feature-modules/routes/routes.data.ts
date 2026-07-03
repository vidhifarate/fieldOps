
import addressRoutes from "../address/address.routes.js";
import authRoutes from "../auth/auth.routes.js";

import serviceRequestRoutes from "../service-request/serviceRequest.routes.js";
import jobRoutes from "../jobs/job.routes.js";
import type {  Routes } from "./routes.types.js";
import userRoutes from "../user/user.routes.js";
import jobMessageRoutes from "../jobMessages/job-message.routes.js";

export const routes :Routes= [authRoutes,addressRoutes,serviceRequestRoutes,jobRoutes,userRoutes,jobMessageRoutes];
