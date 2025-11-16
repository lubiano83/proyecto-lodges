"use client";
import { FB_Carousel } from "./components/home/FB-Carousel";
import Boton from "./components/Boton";
import Title from "./components/Title";
import SubTitle from "./components/SubTitle";
import Texto from "./components/home/Texto";
import Link from "next/link";
import useHome from "./hooks/useHome";
import Cargando from "./components/Cargando";

export default function Home() {

  const { info, images } = useHome();

  if(!info || !images) return <Cargando />

  return (
    <div className="w-full flex flex-col justify-center items-center gap-4 p-8">
      <div className="flex flex-col justify-between items-center gap-1">
        <Title>{info.title}</Title>
        <SubTitle>{info.subtitle}</SubTitle>
      </div>
      <div className="w-full flex flex-col justify-center items-center gap-4">
          <FB_Carousel images={images} />
          <Texto texto={info.texto} />
      </div>
      <Link href={"/lodges"}>
        <Boton>Reservar</Boton>
      </Link>
    </div>
  );
}
