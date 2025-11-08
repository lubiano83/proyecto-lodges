"use client";
import useUser from "@/app/hooks/useUser";

export default function AdminPage() {
    
  const { quantityRegistered, quantityLogged } = useUser();

  return (
    <div className="flex flex-col justify-center items-center">
      <h3>Usuarios Ingresados: {quantityLogged}</h3>
      <h3>Usuarios Registrados: {quantityRegistered}</h3>
    </div>
  );
}