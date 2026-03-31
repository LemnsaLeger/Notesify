// src/components/ui/Button.jsx

const VARIANTS = {
  primary: "bg-[#6C63FF] hover:bg-[#5A52E0] text-white",
  ghost: "bg-transparent hover:bg-white/5 text-white/60 hover:text-white",
  danger:
    "bg-transparent hover:bg-[#FF7675]/10 text-[#FF7675] border-[#FF7675]/30",
};

const SIZES = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-4 py-2 text-sm",
  lg: "px-5 py-2.5 text-base",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  onClick,
  disabled = false,
  className = "",
  ...rest
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        inline-flex items-center justify-center gap-2
        rounded-lg border border-white/10
        font-medium transition-all duration-150
        disabled:opacity-40 disabled:cursor-not-allowed
        active:scale-[0.97]
        ${VARIANTS[variant]}
        ${SIZES[size]}
        ${className}
      `}
      {...rest}
    >
      {children}
    </button>
  );
}
