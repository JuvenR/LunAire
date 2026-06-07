"use client";

import { useActionState } from "react";
import {
  sendContactMessage,
  type ContactState,
} from "@/app/(site)/contact-us/actions";

const initialState: ContactState = { ok: false, error: null };

const labelClass =
  "text-xs font-bold uppercase tracking-[0.12em] text-[#5a6b7b]";
const inputClass =
  "mt-2 w-full rounded-md border border-[#c8d6e2] bg-white px-4 py-2.5 text-[15px] text-[#1c2b3a] outline-none transition focus:border-[#0a6fa4] focus:ring-2 focus:ring-[#0a6fa4]/20";

export function ContactForm() {
  const [state, formAction, pending] = useActionState(
    sendContactMessage,
    initialState
  );

  return (
    <form
      action={formAction}
      className="rounded-2xl bg-white p-8 shadow-[0_14px_30px_rgba(28,62,88,0.1)]"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClass}>
            Name
          </label>
          <input
            id="name"
            name="name"
            required
            placeholder="Your full name"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="phone" className={labelClass}>
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            placeholder="Best number"
            className={inputClass}
          />
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="address" className={labelClass}>
          Address / City
        </label>
        <input
          id="address"
          name="address"
          placeholder="Service location"
          className={inputClass}
        />
      </div>

      <div className="mt-5">
        <label htmlFor="message" className={labelClass}>
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="Tell us the issue and preferred visit time."
          className={`${inputClass} resize-y`}
        />
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center rounded-md bg-[#0a6fa4] px-6 py-2.5 text-[15px] font-bold text-white transition hover:bg-[#0a85c8] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending ? "Sending..." : "Send Request"}
        </button>
        <button
          type="reset"
          className="inline-flex items-center rounded-md border border-[#c8d6e2] bg-white px-6 py-2.5 text-[15px] font-bold text-[#0b3a5e] transition hover:border-[#0a6fa4]"
        >
          Reset
        </button>
      </div>

      {state.ok && (
        <p className="mt-4 text-sm font-semibold text-[#1f9d57]">
          Thanks! We received your request and will get back to you shortly.
        </p>
      )}
      {state.error && (
        <p className="mt-4 text-sm font-semibold text-[#bb0014]">{state.error}</p>
      )}
    </form>
  );
}
