"use client";
import { createContext, ReactNode, useEffect, useState } from "react";
import HomeInterface from "../interface/home.interface";
import { useRouter } from "next/navigation";
import InfoInterface from "../interface/Info.interface";

export const HomeContext = createContext<HomeInterface | undefined>(undefined);

export const HomeProvider = ({ children }: { children: ReactNode }) => {

  const [ info, setInfo ] = useState<InfoInterface | null>(null);
  const [ title, setTitle ] = useState<string>("");
  const [ subtitle, setSubtitle ] = useState<string>("");
  const [ texto, setTexto ] = useState<string>("");
  const [ image, setImage ] = useState<string>("");
  const [ images, setImages ] = useState<string[] | null>(null);

  const router = useRouter();

  useEffect(() => {
    getInfo();
    getImages();
  }, []);

  const getInfo = async() => {
    try {
      const response = await fetch("/api/home/info", {
        method: "GET"
      });
      if(response.ok) {
        const data = await response.json();
        setInfo(data.payload[0]);
        setTitle("");
        setSubtitle("");
        setTexto("");
        return data.payload;
      };
    } catch (error) {
      console.log(error);
    }
  };

  const getImages = async() => {
    try {
      const response = await fetch("/api/home/image", {
        method: "GET"
      });
      if(response.ok) {
        const data = await response.json();
        setImages(data.payload);
        return data.payload;
      };
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <HomeContext.Provider value={{ title, setTitle, subtitle, setSubtitle, texto, setTexto, image, setImage, getInfo, info, getImages, images, setImages }}>
      {children}
    </HomeContext.Provider>
  );
};