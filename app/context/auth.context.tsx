"use client";
import { createContext, useState, ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import UserInterface from "../interface/user.interface";
import AuthInterface from "../interface/auth.interface";

export const AuthContext = createContext<AuthInterface | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {

  const [quantityRegistered, setQuantityRegistered] = useState<number>(0);
  const [ quantityLogged, setQuantityLogged ] = useState<number>(0);
  const [ email, setEmail ] = useState<string>("");
  const [ password, setPassword ] = useState<string>("");
  const [ user, setUser ] = useState<UserInterface | null>(null);
  const [ name, setName ] = useState<string>("");
  const [ phone, setPhone ] = useState<string>("");
  const [ lastname, setLastname ] = useState<string>("");
  const [ country, setCountry ] = useState<string>("");
  const [ state, setState ] = useState<string>("");
  const [ address, setAddress ] = useState<string>("");
  const [ role, setRole ] = useState<string>("user");

  const router = useRouter();

  useEffect(() => {
    checkSession();
    usersRegistered();
    usersLogged();
  }, []);

  const usersRegistered = async () => {
    try {
      const response = await fetch("/api/users/registered", {
        method: "GET",
      });
      const data = await response.json();
      setQuantityRegistered(data.payload);
    } catch (error) {
      console.log(error)
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
      console.log(error)
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
          const data = await response.json();
          await usersLogged();
          await getUserByEmail(email);
          setEmail("");
          setPassword("");
          router.push("/");
          return data.payload;
      } else {
        const error = await response.json();
        setEmail("");
        setPassword("");
        alert(error.message);
        return;
      }
    } catch (error) {
      setEmail("");
      setPassword("");
      console.log(error)
    }
  };

    const updateUserByEmail = async(email: string) => {
    try {
      const response = await fetch(`/api/users/${email}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, lastname, phone, country, state, address })});
      if (response.ok) {
          const data = await response.json();
          await getUserByEmail(email);
          setName("");
          setLastname("");
          setCountry("");
          setState("");
          setAddress("");
          setPhone("");
          router.push("/pages/auth/profile");
          return data.payload;
      } else {
        const error = await response.json();
        alert(error.message);
        return;
      }
    } catch (error) {
      console.log(error)
    }
  };

  const logoutUser = async(email: string) => {
    try {
      const response = await fetch(`/api/users/auth/${email}`, {
        method: "POST",
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        setUser(null);
        router.push("/");
        return data.payload;
      } else {
        const error = await response.json();
        alert(error.message);
        return;
      }
    } catch (error) {
      console.log(error)
    }
  };

  const getUserByEmail = async(email: string) => {
    try {
      if(!email) return;
      const response = await fetch(`/api/users/${email}`, {
        method: "GET",
      });
      const data = await response.json();
      setUser(data.payload);
      return;
    } catch (error) {
      console.log(error)
    }
  };

  const registerUser = async() => {
    try {
      const response = await fetch("/api/users", {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, name, lastname, phone, country, state, address, password })});
      if (response.ok) {
          const data = await response.json();
          await usersRegistered();
          setEmail("");
          setName("");
          setLastname("");
          setPhone("");
          setCountry("");
          setState("");
          setAddress("");
          setPassword("");
          router.push("/pages/auth/login");
          return data.payload;
      } else {
        const error = await response.json();
        alert(error.message);
        return;
      }
    } catch (error) {
      console.log(error)
    }
  };

  const checkSession = async () => {
    try {
      const response = await fetch("/api/users/checkout", {
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        await getUserByEmail(data.email);
        setRole(data.role);
        return data.payload;
      } else {
        return;
      }
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <AuthContext.Provider value={{ quantityRegistered, quantityLogged, loginUser, email, setEmail, password, setPassword, logoutUser, getUserByEmail, user, updateUserByEmail, name, setName, lastname, setLastname, country, setCountry, state, setState, address, setAddress, phone, setPhone, registerUser, role }}>
      {children}
    </AuthContext.Provider>
  );
};