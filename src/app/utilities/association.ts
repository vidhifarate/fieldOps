import { Jobs } from "../feature-modules/jobs/jobs.schemas.js";
import { Users } from "../feature-modules/user/user.schema.js";

export const  initializeAssociation =()=>{
  
  Users.hasMany(Jobs,{
    foreignKey:"technician_id",
    as :"assignedJobs"
  });

  Jobs.belongsTo(Users,
   { foreignKey:"technician_id",
    as:"technician"
   }
  )
}
