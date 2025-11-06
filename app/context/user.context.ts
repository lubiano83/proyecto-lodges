"use client";
import { createContext, ReactNode } from "react";

// 3️⃣ Crea el contexto tipado (con valor por defecto vacío)
export const UserContext = createContext();

// 4️⃣ Define el provider tipado
export const UserProvider = ({ children }: { children: ReactNode }) => {

  return (
    <UserContext.Provider>
      {children}
    </UserContext.Provider>
  );
};
