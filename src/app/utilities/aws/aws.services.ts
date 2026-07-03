import { SendEmailCommand, type SendEmailCommandInput } from "@aws-sdk/client-ses";
import { sesClient } from "./ses.service.js";

export interface EmailOptions {
  recipientEmail: string | string[];
  subject: string;
  htmlContent: string;
  textContent: string;
}

export const sendMail = async (options: EmailOptions) => {
  const payload: SendEmailCommandInput = {
    Source: 'vidhi.farate@coditas.com',
    Destination: {
      ToAddresses: [...options.recipientEmail],
    },
    Message: {
      Subject: { Charset: "UTF-8", Data: options.subject },
      Body: {
        Html: { Charset: "UTF-8", Data: options.htmlContent },
        Text: { Charset: "UTF-8", Data: options.textContent }
      }
    }
  };

  try {
    const command = new SendEmailCommand(payload);
    const result = await sesClient.send(command);
    console.log("email sent");
    return result.MessageId || "Success";
  } catch (error) {
    console.error(`[AWS SES ERROR] Failed sending email to ${options.recipientEmail}:`, error);
    throw error;
  }
};



export const emailTemplates = {

  welcome: async (email: string) => {
    return sendMail({
      recipientEmail: email,
      subject: "FieldOps - PROFILE REGISTERED SUCCESSFULLY ",
      htmlContent: `<p>WELCOME TO FieldOps!! your profile has been registered with ${email}.</p>`,
      textContent: `WELCOME TO FieldOps!! your profile has been registered with ${email}.`
    });
  },

  otp: async (email: string, otp: string) => {
    return sendMail({
      recipientEmail: email,
      subject: "FieldOps - Verify Your Email with OTP",
      htmlContent: `<p>your OTP for account verification is:<strong>${otp}</strong>. it is valid for 5 minutes.</p>`,
      textContent: `your OTP for account verification is: ${otp}. it is valid for 5 minutes.`
    });
  },

  requestCreated: async (email: string, request: string, time: string) => {
    return sendMail({
      recipientEmail: email,
      subject: "FieldOps - Request sent successfully ",
      htmlContent: `<p>new request : ${request} has been posted at ${time} .${email} our tean will reach out to you soon . </p>`,
      textContent: `new request : ${request} has been posted at ${time} .${email} our tean will reach out to you soon ..`
    });

  },

  jobAssigned: async (email: string, jobTitle: string, time: string) => {
    return sendMail({
      recipientEmail: email,
      subject: "FieldOps - New Job ",
      htmlContent: `<p> new job '<strong>${jobTitle}</strong>' has been scheduled for you at ${time}.</p>`,
      textContent: `A new job '${jobTitle}' has been scheduled for you at ${time}.`
    });
  },

  jobCompleted: async (jobTitle: string, dispatherEmail: string, technicianEmail: string, customerEmail: string) => {
    return sendMail({
      recipientEmail: [dispatherEmail, technicianEmail, customerEmail],
      subject: "FieldOps - New Job ",
      htmlContent: `<p> Job ${jobTitle} Completed successfully .</p>`,
      textContent: ` Job ${jobTitle} Completed successfully ..`
    });
  }
  

};

