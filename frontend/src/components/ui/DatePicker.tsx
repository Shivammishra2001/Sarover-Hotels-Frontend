import { Input } from "./Input";
import type { InputHTMLAttributes } from "react";

interface DatePickerProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  error?: string;
}

/** Native date input, styled to match the design system — no external date library required for v1. */
export function DatePicker({ label, error, ...props }: DatePickerProps) {
  return <Input type="date" label={label} error={error} {...props} />;
}
