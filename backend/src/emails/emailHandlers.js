import { resendClient, sender } from "../lib/resend.js";
import { createWelcomeEmailTemplate } from "../emails/emailTemplate.js";
import "dotenv/config";

export const sendWelcomeEmail = async (name, email, clientURL) => {
  const fromEmail = `${sender.name} <${sender.from}>`;
  const { data, error } = await resendClient.emails.send({
    from: fromEmail,
    to: email,
    subject: "Welcome to Chatify",
    html: createWelcomeEmailTemplate(name, clientURL),
  });
  if (error) {
    console.error("Error sending email: ", error);
    throw new Error("Faied to send email");
  }
  console.log("Welcome email send succesfully", data);
};
