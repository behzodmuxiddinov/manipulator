import { mockUsers } from "@/constants";
import { getLocalStorage, setLocalStorage } from "./local-storage.utils";
import { TUser } from "@/types";

export const setUser = (user: TUser) => {
    setLocalStorage("user", user, true);
};

export const initUsers = () => {
  const users = localStorage.getItem("users");
  if (!users) {
    setLocalStorage("users", mockUsers, true);
  }
};

export const getUsers = () => {
  return getLocalStorage("users", true) || [];
};

export const removeUser = (user: TUser) => {
    const allUsers = getLocalStorage("users", true);
    const filtered = allUsers.filter(
      (u: TUser) =>
        u.username !== user.username && u.password !== user.password
    );
    setLocalStorage("users", filtered, true);
};

export const addUser = (user: TUser) => {
  const allUsers = getLocalStorage("users", true);
  const newUsers = [...allUsers, user];
  setLocalStorage("users", newUsers, true);
};