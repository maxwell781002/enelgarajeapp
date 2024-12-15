import { Check } from "lucide-react";

interface SmallCheckButtonProps {
  onClick?: () => void;
  checked?: boolean;
  disabled?: boolean;
}

export default function SmallCheckButton({
  onClick,
  checked = false,
  disabled = false,
}: SmallCheckButtonProps) {
  return (
    <button
      className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
        checked
          ? "bg-green-500 text-white hover:bg-green-600"
          : "bg-white border border-gray-300 text-transparent hover:border-gray-400"
      } ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
      onClick={onClick}
      disabled={disabled}
      aria-checked={checked}
      role="checkbox"
    >
      <Check className="h-4 w-4" />
      <span className="sr-only">{checked ? "Uncheck" : "Check"}</span>
    </button>
  );
}
