"use client";
import Module from "@/app/components/admin/Module";
import Title from "@/app/components/Title";

export default function AdminPage() {
  return (
    <div className="w-full h-full flex flex-col justify-start items-center p-8 gap-6">
      <Title>Panel de Administración:</Title>
      <div className="flex justify-center items-center gap-6 flex-wrap">
        <Module path={"/admin/home"}>Home</Module>
        <Module path={"/admin/users"}>Users</Module>
        <Module path={"/admin/lodges"}>Lodges</Module>
        <Module path={"/admin/orders"}>Orders</Module>
      </div>
    </div>
  );
}
