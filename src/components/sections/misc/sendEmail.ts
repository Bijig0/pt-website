import { Resend } from "resend";
import { type ContactFormSchema } from "./types";

const RESEND_API_KEY = "re_faCnmbUg_4R8UCgt6TchFbAGeeNbSvin4";

const resend = new Resend(RESEND_API_KEY);

export const sendEmail = async (args: ContactFormSchema) => {
  return await resend.emails.send({
    from: "Au Kid Code <ceo@hiuptuition.com>",
    to: ["bradysuryasie@gmail.com"],
    subject: `"PERANCAH PRO ALAT CONTACT`,
    text: JSON.stringify(args),
  });
};
