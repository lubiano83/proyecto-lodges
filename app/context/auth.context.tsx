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
  const [image, setImage] = useState<File | null>(null);
  const [ oldPassword, setOldPassword ] = useState<string>("");
  const [ newPassword, setNewPassword ] = useState<string>("");
  const [ repeatNewPassword, setRepeatNewPassword ] = useState<string>("");

  const router = useRouter();

  useEffect(() => {
    checkSession();
    usersRegistered();
    usersLogged();
  }, []);

  const usersRegistered = async () => {
    try {
      const response = await fetch("/api/admin/registered", {
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
      const response = await fetch("/api/admin/logged", {
          method: "GET"
      });
      const data = await response.json();
      setQuantityLogged(data.payload);
    } catch (error) {
      console.log(error);
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
          // await usersLogged();
          await checkSession();
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
      console.log(error);
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
          router.push("/auth/profile");
          return data.payload;
      } else {
        const error = await response.json();
        alert(error.message);
        return;
      }
    } catch (error) {
      console.log(error);
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
        await checkSession();
        setUser(null);
        setEmail("");
        router.push("/");
        return data.payload;
      } else {
        const error = await response.json();
        alert(error.message);
        return;
      }
    } catch (error) {
      console.log(error);
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
      console.log(error);
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
          router.push("/login");
          return data.payload;
      } else {
        const error = await response.json();
        alert(error.message);
        return;
      }
    } catch (error) {
      console.log(error);
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
        setEmail(data.email);
        setRole(data.role);
        return data.payload;
      } else {
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const changeImageByEmail = async(email: string) => {
    try {
      if (!image) throw new Error("Debes seleccionar una imagen");
      const formData = new FormData();
      formData.append("image", image);
      const response = await fetch(`/api/users/auth/${email}`, {
        method: "PATCH",
        body: formData
      });
      if (response.ok) {
        const data = await response.json();
        await getUserByEmail(email);
        setImage(null);
        router.push("/auth/profile");
        return data.payload;
      } else {
        const error = await response.json();
        alert(error.message);
        setImage(null);
      }
    } catch (error) {
      console.log(error);
    }};

    const changePasswordByEmail = async(email: string) => {
      try {
        const response = await fetch(`/api/users/auth/password/${email}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ oldPassword, newPassword, repeatNewPassword }
        )});
        if(response.ok) {
          const data = await response.json();
          setOldPassword("");
          setNewPassword("");
          setRepeatNewPassword("");
          router.push("/auth/profile");
          return data.payload;
        } else {
          const error = await response.json();
          setOldPassword("");
          setNewPassword("");
          setRepeatNewPassword("");
          alert(error.message);
        };
      } catch (error) {
        console.log(error);
      }
    };

    const recoverPasswordByEmail = async() => {
      try {
        const response = await fetch("/api/users", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email })
        });
        if(response.ok) {
          const data = await response.json();
          setEmail("");
          router.push("/login");
        } else {
          const error = await response.json();
          setEmail("");
          alert(error.message);
        }
      } catch (error) {
        console.log(error);
      }
    };

    const changeRoleByEmail = async(email: string) => {
      try {
        const response = await fetch(`/api/admin/${email}`, {
          method: "PATCH",
        });
        if(response.ok) {
          const data = response.json();
          router.push("/admin");
        } else {
          const error = await response.json();
          alert(error.message);
        }
      } catch (error) {
        console.log(error);
      }
    };

  return (
    <AuthContext.Provider value={{ quantityRegistered, quantityLogged, loginUser, email, setEmail, password, setPassword, logoutUser, getUserByEmail, user, updateUserByEmail, name, setName, lastname, setLastname, country, setCountry, state, setState, address, setAddress, phone, setPhone, registerUser, role, changeImageByEmail, image, setImage, oldPassword, setOldPassword, newPassword, setNewPassword, repeatNewPassword, setRepeatNewPassword, changePasswordByEmail, recoverPasswordByEmail, changeRoleByEmail }}>
      {children}
    </AuthContext.Provider>
  );
};