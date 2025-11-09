"use client";
import useAuth from "@/app/hooks/useAuth";

export default function AdminPage() {
    
  const { quantityRegistered, quantityLogged } = useAuth();

  return (
    <div className="flex flex-col justify-center items-center">
      <h3>Usuarios Ingresados: {quantityLogged}</h3>
      <h3>Usuarios Registrados: {quantityRegistered}</h3>
    </div>
  );
}