"use client";

import { useActionState } from "react";
import {
  sendContactMessage,
  type ContactState,
} from "@/app/(site)/contact-us/actions";

const initialState: ContactState = { ok: false, error: null };

const labelClass =
  "text-base font-extrabold uppercase tracking-[0.12em] text-[#4a5160]";
const inputClass =
  "mt-1.5 w-full rounded-xl border-2 border-[#b7c3d2] bg-white px-3 py-2 text-[15px] font-medium text-[#1c2b3a] outline-none transition placeholder:text-[#a8b4c4] focus:border-[#0a6fa4] focus:ring-2 focus:ring-[#0a6fa4]/15";

export function ContactForm() {
  const [state, formAction, pending] = useActionState(
    sendContactMessage,
    initialState
  );

  return (
    <form
      action={formAction}
      className="rounded-2xl bg-white px-8 py-9 shadow-[0_8px_22px_rgba(28,62,88,0.13)]"
    >
      <div className="grid gap-3 sm:grid-cols-2">
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

      <div className="mt-3">
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

      <div className="mt-4">
        <label htmlFor="message" className={labelClass}>
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          placeholder="Tell us the issue and preferred visit time."
          className={`${inputClass} min-h-[165px] resize-y`}
        />
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex h-10 min-w-[155px] items-center justify-center rounded-lg bg-[#1184c7] px-6 text-sm font-extrabold text-white transition hover:bg-[#0a6fa4] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending ? "Sending..." : "Send Request"}
        </button>
        <button
          type="reset"
          className="inline-flex h-10 min-w-[155px] items-center justify-center rounded-lg border-2 border-[#1184c7] bg-white px-6 text-sm font-extrabold text-[#1184c7] transition hover:bg-[#eaf3fb]"
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
