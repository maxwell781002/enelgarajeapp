interface ShowDataProps {
  object: Record<string, any>;
  className?: string;
  t?: (key: string) => string;
  variant?: "light" | "dark";
}

export default function ShowData({
  object,
  t = (key: string) => key,
  className = "",
  variant = "light",
}: ShowDataProps) {
  const bgColor = variant === "light" ? "bg-white" : "bg-gray-800";
  const textColor = variant === "light" ? "text-gray-800" : "text-white";
  const labelColor = variant === "light" ? "text-gray-700" : "text-gray-300";
  const infoColor = variant === "light" ? "bg-gray-100" : "bg-gray-700";

  return (
    <div className={`${bgColor} ${textColor} ${className}`}>
      {Object.entries(object).map(([key, value]) => (
        <div>
          <label
            htmlFor="phone-number"
            className={`block text-sm font-medium ${labelColor} mb-1`}
          >
            {t(key)}
          </label>
          <div className={`${infoColor} px-3 py-2 rounded-md`}>
            <p id="phone-number" className="text-lg font-medium">
              {value}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
