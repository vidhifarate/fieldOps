import OpenAI from "openai";
import { env } from "../../../validate.env.js";
import { Jobs } from "../jobs/jobs.schemas.js";
import { Users } from "../user/user.schema.js";

const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY,
});
export const CopilotService = {
  async processCommand(dispatcherPrompt: string) {
    //context for ai 
    const activeJobs = await Jobs.findAll({ raw: true });
    const technicians = await Users.findAll({
      where: { role: "Technician" },
      raw: true,
    });
    //tools
    const tools: OpenAI.Chat.ChatCompletionTool[] = [
      {
        type: "function",
        function: {
          name: "getTechnicianRecommendation",
          description:
            "recommends the best technician for a job based on current workload or availability.",
          parameters: {
            type: "object",
            properties: {
              jobContext: {
                type: "string",
                description:"recommend jobs on the bases of the number of job assigned to a technician . technician with less jobs assigned should get the priority "
              
              },
            },
            required: ["jobContext"],
          },
        },
      },
      
        
      {
        type: "function",
        function: {
          name: "getOperationalRundown",
          description:
            "Pulls together a summarized operational rundown.",
          parameters: {
            type: "object",
            properties: {},
          },
        },
      },
    ];
    // 3. Dispatch context to the LLM
    const response :any= await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `
You are the Dispatch Copilot.
Current Database Context:
Active Technicians:
${JSON.stringify(
  technicians.map((t) => ({
    id: t.id,
    name: t.name,
  }))
)}
Active Jobs:
${JSON.stringify(
  activeJobs.map((j) => ({
    id: j.id,
    status: j.status,
    description: j.description,
  }))
)}
If the user's intent matches one of the provided tools,
invoke it with correct arguments.
`,
        },
        {
          role: "user",
          content: dispatcherPrompt,
        },
      ],
      tools,
      tool_choice: "auto",
    });
    const responseMessage = response.choices[0].message;
    if (
      responseMessage.tool_calls &&
      responseMessage.tool_calls.length > 0
    ) {
      const toolCall = responseMessage.tool_calls[0];
      const functionName = toolCall.function.name;
      const functionArgs = JSON.parse(
        toolCall.function.arguments
      );
      return await this.executeAction(
        functionName,
        functionArgs,
        technicians,
        activeJobs
      );
    }
    return {
      type: "text_response",
      data: responseMessage.content,
    };
  },
  async executeAction(
    functionName: string,
    functionArgs: any,
    technicians: any[],
    activeJobs: any[]
  ) {
    if (functionName === "getTechnicianRecommendation") {
      // Implement technician recommendation logic
      const technicianWithLeastJobs = technicians.reduce((prev, current) =>
        (prev.jobCount || 0) < (current.jobCount || 0) ? prev : current
      );
      return {
        type: "function_response",
        function: functionName,
        data: technicianWithLeastJobs,
      };
    } else if (functionName === "getOperationalRundown") {
      // Implement operational rundown logic
      return {
        type: "function_response",
        function: functionName,
        data: {
          totalJobs: activeJobs.length,
          totalTechnicians: technicians.length,
          activeJobs: activeJobs,
        },
      };
    }
    return {
      type: "error",
      message: "Unknown function",
    };
  },
}