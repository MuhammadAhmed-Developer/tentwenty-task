import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  checkboxLabel?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, checkboxLabel, className, type, ...props }, ref) => {
    if (type === "checkbox") {
      return (
        <label className="flex items-center cursor-pointer">
          <input
            ref={ref}
            type="checkbox"
            className={`w-4 h-4 rounded border-gray-300 cursor-pointer text-primary focus:ring-2 focus:ring-primary ${
              className || ""
            }`}
            {...props}
          />
          {checkboxLabel && (
            <span className="ml-2 text-sm text-gray-700">{checkboxLabel}</span>
          )}
        </label>
      );
    }

    return (
      <div className="w-full">
        {label && (
          <label className="block text-[14px] text-heading font-medium mb-2">
            {label}
          </label>
        )}
        <input
          ref={ref}
          type={type}
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
