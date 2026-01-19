import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, className, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-[14px] text-heading font-medium mb-2">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            className || ""
          }`}
          {...props}
        />
      </div>
    );
  }
);

Input.displayName = "Input";
