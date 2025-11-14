import { ReactNode } from "react";

export default function Boton({ children }: { children: ReactNode }) {
  return (
    <button className="min-w-24 bg-(--color6) hover:bg-(--color5) text-(--color3) py-1 px-4 rounded-xl border-3 border-(--color3) shadow-sm hover:cursor-pointer shadow-gray-700 text-lg">
      {children}
    </button>
  );
}
