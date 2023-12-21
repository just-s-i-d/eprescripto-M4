import { getUserData } from "@utils/Doctor";
import { showToast } from "@utils/common";
import {
  PropsWithChildren,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";

type UserContextType = {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<SetStateAction<boolean>>;
  isDarkTheme: boolean;
  setIsDarkTheme: React.Dispatch<SetStateAction<boolean>>;
  role?: string;
  setRole: React.Dispatch<SetStateAction<string | undefined>>;
} | null;

export const UserContext = createContext<UserContextType>(null);
export const UserProvider = ({ children }: PropsWithChildren) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false);
  const [role, setRole] = useState<string>();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getUserData()
        .then((res) => {
          setRole(res.role?.type);
        })
        .catch((error) => {
          showToast(error.message, error.type);
        });
    }
    setIsLoggedIn(!!token);
  }, []);
  const value = {
    isLoggedIn,
    setIsLoggedIn,
    role,
    setRole,
    isDarkTheme,
    setIsDarkTheme,
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
