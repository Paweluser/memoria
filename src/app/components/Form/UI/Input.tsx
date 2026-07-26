"use client";

import { InputHTMLAttributes } from "react";
import { useFormStatus } from "react-dom";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  inputAttribute: string;
  autoComplete?: string;
  type?: string;
}

export function Input({
  label,
  inputAttribute,
  autoComplete,
  type,
  ...props
}: InputProps) {
  const { pending } = useFormStatus();

  return (
    <div className="space-y-2">
      <label htmlFor={inputAttribute} className="block text-sm">
        {label}
      </label>
      <input
        type={type || inputAttribute}
        id={inputAttribute}
        name={inputAttribute}
        autoComplete={autoComplete}
        disabled={pending}
        {...props}
        className="w-full rounded-lg border px-4 py-3"
      />
    </div>
  );
}
