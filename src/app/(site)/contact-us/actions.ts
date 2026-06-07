"use server";

import { Resend } from "resend";
import { contact } from "@/content/contact";

export type ContactState = {
  ok: boolean;
  error: string | null;
};

export async function sendContactMessage(
  _prevState: ContactState,
  formData: FormData
): Promise<ContactState> {
  const name = String(formData.get("name") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const address = String(formData.get("address") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !phone || !message) {
    return {
      ok: false,
      error: "Please fill in your name, phone, and message.",
    };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return {
      ok: false,
      error: "Email is not configured yet. Please call us instead.",
    };
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL ?? "LunAire <onboarding@resend.dev>",
      to: process.env.CONTACT_TO_EMAIL ?? contact.email.label,
      subject: `New contact request from ${name}`,
      text: [
        `Name: ${name}`,
        `Phone: ${phone}`,
        `Address / City: ${address || "—"}`,
        "",
        "Message:",
        message,
      ].join("\n"),
    });

    if (error) {
      return {
        ok: false,
        error: "Something went wrong sending your message. Please call us.",
      };
    }

    return { ok: true, error: null };
  } catch {
    return {
      ok: false,
      error: "Something went wrong sending your message. Please call us.",
    };
  }
}
