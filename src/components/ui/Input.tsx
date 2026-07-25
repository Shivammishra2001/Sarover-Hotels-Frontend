import { cn } from "@/lib/utils";
import { forwardRef, type InputHTMLAttributes, type LabelHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, id, ...props }, ref) => {
    const inputId = id ?? props.name;
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-ink">
            {label}
            {props.required && <span className="text-accent"> *</span>}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            "rounded-lg border border-border bg-surface px-4 py-2.5 text-sm text-ink placeholder:text-ink/40 focus:border-navy focus:outline-none focus:ring-2 focus:ring-navy/20",
            error && "border-accent focus:border-accent focus:ring-accent/20",
            className
          )}
          {...props}
        />
        {error && <span className="text-xs text-accent">{error}</span>}
      </div>
    );
  }
);
Input.displayName = "Input";

export function FieldLabel(props: LabelHTMLAttributes<HTMLLabelElement>) {
  return <label className="text-sm font-medium text-ink" {...props} />;
}
