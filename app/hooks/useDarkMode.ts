import { useEffect, useState } from "react";

const useDarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    try {
      const storedTheme = localStorage.getItem("theme");
      if (storedTheme === "dark") {
        setIsDarkMode(true);
        document.documentElement.classList.add("dark");
      } else {
        setIsDarkMode(false);
        document.documentElement.classList.remove("dark");
      }
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message);
      throw new Error("Hubo un error en el backend..");
    }
  }, []);

  const toggleDarkMode = () => {
    try {
      setIsDarkMode((prev) => {
        const newMode = !prev;
        if (newMode) {
          document.documentElement.classList.add("dark");
          localStorage.setItem("theme", "dark");
        } else {
          document.documentElement.classList.remove("dark");
          localStorage.setItem("theme", "light");
        }
        return newMode;
      });
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message);
      throw new Error("Hubo un error en el backend..");
    }
  };

  return { isDarkMode, toggleDarkMode };
};

export default useDarkMode;
