"use client";
import { createContext, useState, ReactNode } from "react";
import { UserInterface } from "../interface/user.interface";

interface UserContextType {
  user: UserInterface | null;
  setUser: (user: UserInterface | null) => void;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserInterface | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};