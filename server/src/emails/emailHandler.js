import { transporter } from "../lib/mailer.js";
import { createWelcomeEmailTemplate } from "./emailTemplate.js";

export const sendWelcomeEmail = async (email, name, clientURL) => {
  try {
    const info = await transporter.sendMail({
      from: `"ChatMe" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `Welcome to ChatMe, ${name}`,
      html: createWelcomeEmailTemplate(name, clientURL),
    });
    console.log("Welcome email sent successfully:", info.messageId);
  } catch (error) {
    console.error("Error sending welcome email:", error);
    throw new Error("Failed to send welcome email");
  }
};
