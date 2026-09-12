import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  vertical?: "india" | "global";
  variant?: "primary" | "whatsapp" | "outline";
}

export default function Button({
  className,
  vertical = "india",
  variant = "primary",
  children,
  ...props
}: ButtonProps) {
  const baseClasses = "font-sans font-bold px-6 py-3 border-2 cursor-pointer transition-all";

  const variants = {
    primary: {
      india: "bg-india-primary text-white border-india-primary shadow-sticker hover:shadow-md",
      global: "bg-global-secondary text-global-bg border-global-secondary shadow-sticker-global hover:shadow-md"
    },
    whatsapp: {
      india: "bg-whatsapp text-white border-whatsapp shadow-sticker hover:shadow-md flex items-center justify-center gap-2",
      global: "bg-whatsapp text-white border-whatsapp shadow-sticker-global hover:shadow-md flex items-center justify-center gap-2"
    },
    outline: {
      india: "bg-transparent text-india-primary border-india-primary shadow-sticker hover:shadow-md",
      global: "bg-transparent text-global-primary border-global-primary shadow-sticker-global hover:shadow-md"
    }
  };

  const finalClassName = `${baseClasses} ${variants[variant][vertical]} ${className || ''}`;

  return (
    <button
      className={finalClassName}
      {...props}
    >
      {children}
    </button>
  );
}
