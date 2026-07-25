"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { DatePicker } from "@/components/ui/DatePicker";
import { createInquiry } from "@/lib/api";
import { StrapiApiError } from "@/lib/strapi";
import type { InquiryType } from "@/types";

const INQUIRY_TYPE_OPTIONS: Array<{ value: InquiryType; label: string }> = [
  { value: "room_booking", label: "Room Booking" },
  { value: "wedding", label: "Wedding" },
  { value: "event", label: "Event" },
  { value: "mice", label: "MICE / Conference" },
  { value: "banquet", label: "Banquet" },
  { value: "dining", label: "Dining" },
  { value: "general", label: "General Enquiry" },
];

interface InquiryFormProps {
  defaultInquiryType?: InquiryType;
  hotelId?: string;
  banquetId?: string;
  offerId?: string;
  title?: string;
  description?: string;
  showInquiryTypeField?: boolean;
}

interface FormState {
  full_name: string;
  email: string;
  phone: string;
  inquiry_type: InquiryType;
  event_date: string;
  guest_count: string;
  message: string;
}

const initialState = (defaultInquiryType: InquiryType): FormState => ({
  full_name: "",
  email: "",
  phone: "",
  inquiry_type: defaultInquiryType,
  event_date: "",
  guest_count: "",
  message: "",
});

export function InquiryForm({
  defaultInquiryType = "general",
  hotelId,
  banquetId,
  offerId,
  title = "Send an Enquiry",
  description = "Share a few details and our team will get back to you within 24 hours.",
  showInquiryTypeField = true,
}: InquiryFormProps) {
  const [form, setForm] = useState<FormState>(initialState(defaultInquiryType));
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const updateField = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const validate = (): boolean => {
    const nextErrors: Partial<Record<keyof FormState, string>> = {};
    if (!form.full_name.trim()) nextErrors.full_name = "Full name is required";
    if (!form.email.trim() && !form.phone.trim()) {
      nextErrors.email = "Provide an email or phone number";
      nextErrors.phone = "Provide an email or phone number";
    }
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nextErrors.email = "Enter a valid email address";
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (status === "submitting") return;
    if (!validate()) return;

    setStatus("submitting");
    setErrorMessage("");

    try {
      await createInquiry({
        full_name: form.full_name.trim(),
        email: form.email.trim() || undefined,
        phone: form.phone.trim() || undefined,
        inquiry_type: form.inquiry_type,
        event_date: form.event_date || undefined,
        guest_count: form.guest_count ? Number(form.guest_count) : undefined,
        message: form.message.trim() || undefined,
        source: "website",
        hotel: hotelId,
        banquet: banquetId,
        offer: offerId,
      });
      setStatus("success");
      setForm(initialState(defaultInquiryType));
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof StrapiApiError
          ? error.message
          : "Something went wrong. Please try again in a moment."
      );
    }
  };

  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-muted p-8 text-center">
        <CheckCircle2 className="text-accent" size={40} />
        <h3 className="font-display text-xl font-semibold text-navy">Enquiry Sent</h3>
        <p className="text-sm text-ink/70">
          Thank you, {form.full_name || "there"}! Our team will reach out shortly.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-2 text-sm font-semibold text-accent hover:underline"
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
      <h3 className="font-display text-xl font-semibold text-navy">{title}</h3>
      <p className="mt-1 text-sm text-ink/60">{description}</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Input
          label="Full Name"
          name="full_name"
          required
          value={form.full_name}
          onChange={(e) => updateField("full_name", e.target.value)}
          error={errors.full_name}
        />
        {showInquiryTypeField && (
          <Select
            label="Enquiry Type"
            name="inquiry_type"
            options={INQUIRY_TYPE_OPTIONS}
            value={form.inquiry_type}
            onChange={(e) => updateField("inquiry_type", e.target.value as InquiryType)}
          />
        )}
        <Input
          label="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={(e) => updateField("email", e.target.value)}
          error={errors.email}
        />
        <Input
          label="Phone"
          name="phone"
          type="tel"
          value={form.phone}
          onChange={(e) => updateField("phone", e.target.value)}
          error={errors.phone}
        />
        <DatePicker
          label="Preferred Date"
          name="event_date"
          value={form.event_date}
          onChange={(e) => updateField("event_date", e.target.value)}
        />
        <Input
          label="Guest Count"
          name="guest_count"
          type="number"
          min={1}
          value={form.guest_count}
          onChange={(e) => updateField("guest_count", e.target.value)}
        />
      </div>

      <div className="mt-4 flex flex-col gap-1.5">
        <label htmlFor="message" className="text-sm font-medium text-ink">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          value={form.message}
          onChange={(e) => updateField("message", e.target.value)}
          className="rounded-lg border border-border bg-surface px-4 py-2.5 text-sm text-ink placeholder:text-ink/40 focus:border-navy focus:outline-none focus:ring-2 focus:ring-navy/20"
          placeholder="Tell us more about your requirements..."
        />
      </div>

      {status === "error" && (
        <p className="mt-4 rounded-lg bg-accent/10 px-4 py-2 text-sm text-accent">{errorMessage}</p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent/90 disabled:opacity-60"
      >
        {status === "submitting" && <Loader2 size={16} className="animate-spin" />}
        {status === "submitting" ? "Sending..." : "Send Enquiry"}
      </button>
    </form>
  );
}
