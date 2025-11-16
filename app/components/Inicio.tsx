"use client";
import Footer from "./footer/Footer";
import Navbar from "./navbar/Navbar";
import useDarkMode from "../hooks/useDarkMode";
import useShow from "../hooks/useShow";
import Menu from "./menu/Menu";
import { ReactNode } from "react";
import useAuth from "../hooks/useAuth";

export default function Inicio({
  children,
  email,
  address,
  derechos,
  googleMaps,
}: {
  children: ReactNode;
  email: string;
  address: string;
  derechos: string;
  googleMaps: string;
}) {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const { show, handleShow } = useShow();
  const { user } = useAuth();

  return (
    <>
      <Navbar
        toggleDarkMode={toggleDarkMode}
        handleShow={handleShow}
        isDarkMode={isDarkMode}
        user={user}
      />
      <main className="h-full w-full flex flex-col justify-start items-center">
        {show ? <Menu handleShow={handleShow} /> : ""}
        {children}
      </main>
      <Footer
        email={email}
        address={address}
        derechos={derechos}
        googleMaps={googleMaps}
      />
    </>
  );
}
