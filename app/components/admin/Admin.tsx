"use client";
import Title from "../Title";
import Module from "./Module";

export default function Admin() {

  return (
    <div className="w-full h-full flex flex-col justify-start items-center gap-6">
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
