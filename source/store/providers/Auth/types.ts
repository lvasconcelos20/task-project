  "use client";

  import { Dispatch, SetStateAction } from "react";

  import { z } from "zod";

  import SignUpForm from "@/validations/signUp";


  type SignUpFormValidationData = z.infer<typeof SignUpForm>;

  export interface AuthContextType {
    logoutUser: () => void;
    setUserUid: Dispatch<SetStateAction<string>>;
    userUid: string;
    userEmail: string,
    userRole: string | null;
    createUserWithInternalService: ({
      email,
      password,
      name,
      role
    }: SignUpFormValidationData) => Promise<void>;
    loading: Record<string, boolean>;
    loginWithInternalService: (email: string, password: string) => void;
    waitForUserSync: () => Promise<void>;
  }
