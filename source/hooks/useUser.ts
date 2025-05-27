import { useContext } from "react";

import type { UserContextType } from "@/source/store/providers/User/types";
import UserContext from "@/source/store/providers/User/context";

export default function useUser(): UserContextType {
  return useContext(UserContext);
}
