"use client";
import Module from "./Module";
import Contador from "./users/Contador";

export default function Admin() {

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <Module>Usuarios</Module>
    </div>
  );
}
