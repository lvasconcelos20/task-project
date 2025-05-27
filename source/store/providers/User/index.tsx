"use client";

import { useState } from "react";

import { errorToast, successToast } from "@/source/hooks/useAppToast";
import { getAllUsers } from "@/source/store/services/user";
import { UserEntity } from "@/common/entities/user";


import UserContext from "./context";

interface Props {
  children: React.ReactNode;
}

const UserProvider = ({ children }: Props) => {

  const initialLoadingObject = {
    updateUserDoc: false,
    getAllUsers: false
  };
  const [loading, setLoading] = useState(initialLoadingObject);
  const [allUsers, setAllUsers] = useState<UserEntity[] | null>();

  

  const fetchAllUsers = async () => {
    setLoading((prev) => ({ ...prev, getAllUsers: true }));
    const users = await getAllUsers();
    if (users.length === 0) {
      errorToast("Não foram encontrados usuários");
    }
    setAllUsers(users);
    return users;
  };

  return (
    <UserContext.Provider
      value={{
        loading,
        fetchAllUsers,
        allUsers
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
