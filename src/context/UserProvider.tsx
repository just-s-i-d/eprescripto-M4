import {
  PropsWithChildren,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";

import { getUserData } from "@utils/Doctor";
import { showToast } from "@utils/common";

type UserContextType = {
  isLoggedIn?: boolean;
  setIsLoggedIn?: React.Dispatch<SetStateAction<boolean>>;
  isDarkTheme?: boolean;
  setIsDarkTheme?: React.Dispatch<SetStateAction<boolean>>;
  role?: string;
  setRole?: React.Dispatch<SetStateAction<string | undefined>>;
  refresh?: boolean;
  setRefresh?: React.Dispatch<SetStateAction<boolean | undefined>>;
  getRole?: () => void;
};

export const UserContext = createContext<UserContextType>({});
export const UserProvider = ({ children }: PropsWithChildren) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false);
  const [role, setRole] = useState<string>();

  const getRole = () => {
    getUserData()
      .then((res) => {
        setRole(res.role?.type);
      })
      .catch((error) => {
        showToast(error.message, error.type);
      });
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getRole();
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
    getRole,
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
