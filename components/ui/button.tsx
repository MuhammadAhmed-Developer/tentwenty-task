import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  fullWidth?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ fullWidth = false, className, children, ...props }, ref) => {
    const baseStyles = "px-4 py-2 font-medium rounded-lg ";
    const variant = "bg-primary text-white";

    const widthClass = fullWidth ? "w-full" : "";

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variant} ${widthClass} ${className || ""}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
