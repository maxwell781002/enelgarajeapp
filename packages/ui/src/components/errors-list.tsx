import React from "react";
import { AlertCircle } from "lucide-react";

interface ErrorListProps {
  title?: string;
  errors: string[];
}

export const ErrorList: React.FC<ErrorListProps> = ({ errors, title }) => {
  if (errors.length === 0) return null;

  return (
    <div className="bg-red-50 border-l-4 border-red-400 p-2" role="alert">
      <div className="flex items-center">
        <AlertCircle className="h-5 w-5 text-red-400 mr-2" aria-hidden="true" />
        <h3 className="text-red-800 font-medium">{title || "Error"}</h3>
      </div>
      <ul className="mt-2 list-disc list-inside">
        {errors.map((error, index) => (
          <li key={index} className="text-red-700">
            {error}
          </li>
        ))}
      </ul>
    </div>
  );
};
