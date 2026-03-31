// src/components/ui/Badge.jsx

const COLORS = {
  work: "bg-[#4834D4]/20 text-[#4834D4] border-[#4834D4]/30",
  learning: "bg-[#6C63FF]/20 text-[#6C63FF] border-[#6C63FF]/30",
  ideas: "bg-[#FDCC0D]/20 text-[#FDCC0D] border-[#FDCC0D]/30",
  default: "bg-white/10 text-white/50 border-white/10",
};

export default function Badge({ label }) {
  const colorClass = COLORS[label?.toLowerCase()] ?? COLORS.default;

  return (
    <span
      className={`
      inline-flex items-center
      px-2 py-0.5 rounded-full
      text-xs font-medium
      border
      ${colorClass}
    `}
    >
      {label}
    </span>
  );
}
