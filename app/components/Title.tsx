import { ReactNode } from "react";

export default function Title({ children }: { children: ReactNode }) {
  return (
    <h2 className="text-center text-3xl text-dark font-semibold underline italic">
      {children}
    </h2>
  );
}
