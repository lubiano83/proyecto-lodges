"use client";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("useUser debe usarse dentro de un UserProvider");
  return context;
};

export default useAuth;
