import type { z } from "zod";
import { zfd } from "zod-form-data";

export const contactFormSchema = zfd.formData({
  firstName: zfd.text(),
  lastName: zfd.text(),
  email: zfd.text(),
  phoneNumber: zfd.text(),
  details: zfd.text(),
});

export type ContactFormSchema = z.infer<typeof contactFormSchema>;
