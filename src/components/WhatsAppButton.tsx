import React from "react";

interface WhatsAppButtonProps {
  phoneNumber?: string;
  message?: string;
  text?: string;
  className?: string;
  variant?: 'primary' | 'secondary' | 'white';
  size?: 'sm' | 'md' | 'lg';
}

export default function WhatsAppButton({
  phoneNumber = '917006822051',
  message = 'Hello! I am interested in your property. Please provide more details.',
  text = 'WhatsApp Us',
  className = '',
  variant = 'primary',
  size = 'md',
}: WhatsAppButtonProps) {
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  const sizeStyles = {
    sm: 'text-xs px-4 py-2',
    md: 'text-sm px-6 py-3.5',
    lg: 'text-lg px-8 py-4',
  };

  const variantStyles = {
    primary:
      'bg-[#25D366] text-white border-3 border-[#101A2C] shadow-[4px_4px_0px_0px_#101A2C] hover:bg-[#20bd5a] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_0px_#101A2C]',
    secondary:
      'bg-[#25D366] text-white border-3 border-[#101A2C] shadow-[4px_4px_0px_0px_#101A2C] hover:bg-[#20bd5a] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_0px_#101A2C]',
    white:
      'bg-white text-[#101A2C] border-3 border-[#101A2C] shadow-[4px_4px_0px_0px_#101A2C] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_0px_#101A2C]',
  };

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`font-heading font-bold transition-all duration-100 cursor-pointer inline-flex items-center justify-center gap-2 ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
    >
      {text}
    </a>
  );
}
