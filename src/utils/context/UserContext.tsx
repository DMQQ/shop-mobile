import React, { useContext, createContext, useState } from "react";
import type {
  UserContextProviderType,
  UserContextType,
  UserType,
} from "/@types/types";
import { setItemAsync, getItemAsync, deleteItemAsync } from "expo-secure-store";

export const USER_PREFIX = "react-native-shop-user";

export const init: UserType = {
  token: "",
  user_id: 0,
  name: "",
  isLoggedIn: false,
  isLoading: true,
  role: "",
};

const User = createContext<UserContextType>({
  user: init,
  ReadUser: () => new Promise((r, j) => {}),
  RemoveUser: () => {},
  SaveUser: (props: UserType) => {},
  setUser: (prop) => {},
  updateToken: (token: string) => {},
  getToken: () => new Promise(() => String),
});

export const UserContextProvider = ({ children }: UserContextProviderType) => {
  const [user, setUser] = useState(init);

  const setLoggedIn = () => setUser((p) => ({ ...p, isLoggedIn: true }));

  async function SaveUser(props: UserType) {
    setUser(props);
    setLoggedIn();

    await setItemAsync(USER_PREFIX, JSON.stringify(props));
  }

  async function updateToken(token: string) {
    await setItemAsync(USER_PREFIX, JSON.stringify({ ...user, token }));

    setUser((prev) => ({ ...prev, token }));
  }

  async function ReadUser() {
    try {
      const value = await getItemAsync(USER_PREFIX);

      if (value !== null) {
        setUser({ ...JSON.parse(value), isLoading: false, isLoggedIn: true });
      }

      return JSON.parse(value ?? "{}");
    } catch (error) {
      setUser((prev) => ({ ...prev, isLoading: false }));
    }
  }

  async function RemoveUser() {
    await deleteItemAsync(USER_PREFIX);
    setUser({ ...init, isLoading: false });
  }

  async function getToken() {
    const str = await getItemAsync(USER_PREFIX);
    if (str !== null) return JSON.parse(str).token;
    return "";
  }

  return (
    <User.Provider
      value={{
        user,
        setUser,
        SaveUser,
        updateToken,
        ReadUser,
        RemoveUser,
        getToken,
      }}
    >
      {children}
    </User.Provider>
  );
};

export const useUser = () => {
  return useContext(User);
};
