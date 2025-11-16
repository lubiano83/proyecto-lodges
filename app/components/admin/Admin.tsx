"use client";
import Title from "../Title";
import Module from "./Module";

export default function Admin() {

  return (
    <div className="w-full h-full flex flex-col justify-start items-center gap-6">
      <Title>Panel de Administración:</Title>
      <div className="flex justify-center items-center gap-6 flex-wrap">
        <Module>home</Module>
        <Module>users</Module>
        <Module>lodges</Module>
        <Module>orders</Module>
      </div>
    </div>
  );
}
