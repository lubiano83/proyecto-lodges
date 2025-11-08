"use client";
import { createContext, useState, ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";

interface UserContextType {
  quantityRegistered: number;
  quantityLogged: number;
  loginUser: () => void;
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  logoutUser: (email: string) => void;
  logged: boolean;
  getUserByEmail: (email: string) => void;
  user: any;
};

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {

  const [quantityRegistered, setQuantityRegistered] = useState<number>(0);
  const [ quantityLogged, setQuantityLogged ] = useState<number>(0);
  const [ email, setEmail ] = useState<string>("");
  const [ password, setPassword ] = useState<string>("");
  const [ logged, setLogged ] = useState<boolean>(false);
  const [ user, setUser ] = useState<any>();

  const router = useRouter();

  useEffect(() => {
    usersRegistered();
    usersLogged();
    if(email) getUserByEmail(email);
  }, []);

  const usersRegistered = async () => {
    try {
      const response = await fetch("/api/users/registered", {
        method: "GET",
      });
      const data = await response.json();
      setQuantityRegistered(data.payload);
    } catch (error) {
      throw new Error("Hubo un error en el context..");
    }
  };

  const usersLogged = async() => {
    try {
      const response = await fetch("/api/users/logged", {
          method: "GET"
      });
      const data = await response.json();
      setQuantityLogged(data.payload);
    } catch (error) {
      throw new Error("Hubo un error en el context..");
    }
  };

  const loginUser = async() => {
    try {
      const response = await fetch("/api/users/auth", {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password })});
      if (response.ok) {
          await usersLogged();
          alert("Login realizado con exito.");
          setLogged(true);
          router.push("/");
          return true;
      } else {
          const error = await response.json();
          alert(error.message);
          return false;
      }
    } catch (error) {
      throw new Error("Hubo un error en el context..");
    }
  };

  const logoutUser = async(email: string) => {
    try {
      const response = await fetch(`/api/users/auth/${email}`, {
        method: "POST",
        credentials: "include",
      });
      if (response.ok) {
        await usersLogged();
        setLogged(false);
        alert("Logout realizado con éxito");
        router.push("/");
        return true;
      } else {
        const error = await response.json();
        alert(error.message);
        return false;
      }
    } catch (error) {
      throw new Error("Hubo un error en el context..");
    }
  };

  const getUserByEmail = async(email: string) => {
    try {
      const response = await fetch(`/api/users/${email}`, {
        method: "GET",
      });
      const data = await response.json();
      setUser(data.payload)
    } catch (error) {
      throw new Error("Hubo un error en el context..");
    }
  };

  return (
    <UserContext.Provider value={{ quantityRegistered, quantityLogged, loginUser, email, setEmail, password, setPassword, logoutUser, logged, getUserByEmail, user }}>
      {children}
    </UserContext.Provider>
  );
};