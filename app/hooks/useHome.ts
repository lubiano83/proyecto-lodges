"use client";
import { useContext } from "react";
import { HomeContext } from "../context/home.context";

const useHome = () => {
  const context = useContext(HomeContext);
  if (!context)
    throw new Error("useUser debe usarse dentro de un UserProvider");
  return context;
};

export default useHome;