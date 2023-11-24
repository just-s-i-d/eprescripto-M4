import {
  PropsWithChildren,
  SetStateAction,
  createContext,
  useState,
} from "react";

type UserContextType = {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<SetStateAction<boolean>>;
  role: string;
} | null;

export const UserContext = createContext<UserContextType>(null);
export const UserProvider = ({ children }: PropsWithChildren) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const role = "doctor";
  const value = {
    isLoggedIn,
    setIsLoggedIn,
    role,
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
