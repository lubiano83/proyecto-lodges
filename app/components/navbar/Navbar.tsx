"use client";
import Link from "next/link";
import Logo from "../Logo";
import SvgImage from "../SvgImage";
import UserInterface from "@/app/interface/user.interface";
import ProfileImage from "../users/profile/ProfileImage";

export default function Navbar({
  toggleDarkMode,
  handleShow,
  isDarkMode,
  user,
}: {
  toggleDarkMode: () => void;
  handleShow: () => void;
  isDarkMode: boolean;
  user: UserInterface | null;
}) {
  return (
    <header className="bg-(--color1) text-(--color3) w-full p-4 flex justify-around items-center gap-4">
      <div className="flex gap-2">
        <SvgImage
          src={"/menu-svgrepo-com-white.svg"}
          size={30}
          fnc={handleShow}
        />
        <Logo />
      </div>

      {isDarkMode ? (
        <SvgImage
          src="/moon-svgrepo-com-white.svg"
          fnc={toggleDarkMode}
          size={33}
        />
      ) : (
        <SvgImage
          src="/sun-4-svgrepo-com-white.svg"
          fnc={toggleDarkMode}
          size={33}
        />
      )}
      <Link href={"/auth/profile"}>
        <div
          className={`${user && user?.image ? "bg-(--color3)" : "bg-(--color1)"} aspect-square w-8 h-8 rounded-full overflow-hidden flex justify-center items-center`}
        >
          {user?.image ? (
            <ProfileImage image={user.image} />
          ) : (
            <SvgImage src={"/user-circle-svgrepo-com-white.svg"} size={35} />
          )}
        </div>
      </Link>
    </header>
  );
}
