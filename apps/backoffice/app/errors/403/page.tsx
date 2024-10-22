import Link from "next/link";
import { ShieldX } from "lucide-react";

export default function PaginaErrorProhibido() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 py-8">
      <div className="text-center">
        <ShieldX
          className="mx-auto h-24 w-24 text-red-500 mb-8"
          aria-hidden="true"
        />
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          403 - Acceso Prohibido
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Lo sentimos, no tienes permiso para acceder a esta página.
        </p>
        {/* <Link
          href="/"
          className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
        >
          Volver a la página principal
        </Link> */}
      </div>
    </div>
  );
}
