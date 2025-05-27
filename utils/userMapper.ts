import { Timestamp } from "firebase/firestore";

import { UserEntity } from "@/common/entities/user";

export const userMapper = (apiData: any): UserEntity => {
  return {
    id: apiData.uid,
    name: apiData.name,
    email: apiData.email,
    password: apiData.password,
    username: apiData.username

  };
};
