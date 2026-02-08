import { Resend } from "resend";
import "dotenv/config";
import { ENV } from "./env.js";

if (!ENV.RESEND_API_KEY) {
  throw new Error("RESEND_API_KEY is not set");
}
if (!ENV.EMAIL_FROM || !ENV.EMAIL_FROM_NAME) {
  throw new Error("EMAIL_FROM / EMAIL_FROM_NAME is not set");
}

export const resendClient = new Resend(ENV.RESEND_API_KEY);
export const sender = {
  from: ENV.EMAIL_FROM,
  name: ENV.EMAIL_FROM_NAME,
};
