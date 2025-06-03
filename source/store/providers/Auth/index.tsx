"use client";

import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { getDoc, doc, getFirestore } from "firebase/firestore";
import { z } from "zod";

import firebaseApp from "@/source/config/firebase";
import { errorToast, successToast } from "@/source/hooks/useAppToast";
import {
  createUserWithEmailAndPasswordLocal,
  logOut,
  signInWithEmailAndPasswordLocal,
} from "@/source/store/services/auth";
import {
  createNewUserDoc,
  waitForUser,
} from "@/source/store/services/user";
import SignUpForm from "@/validations/signUp";
import AuthContext from "./context";

import type { UserEntity as UserDoc } from "@/common/entities/user";

interface Props {
  children: React.ReactNode;
}

const db = getFirestore(firebaseApp);

export type UserType = UserDoc | null;
type SignUpFormValidationData = z.infer<typeof SignUpForm>;

const AuthProvider = ({ children }: Props) => {
  const initialLoadingObject = {
    onAuthUserChanged: true,
    loginWithInternalService: false,
    createUserWithInternalService: false,
    logout: false,
  };

  const [userUid, setUserUid] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");
  const [userRole, setUserRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(initialLoadingObject);

  const router = useRouter();
  const auth = getAuth(firebaseApp);

  const fetchUserRole = async (uid: string): Promise<string | null> => {
    const userDoc = await getDoc(doc(db, "users", uid));
    const userData = userDoc.data();
    return userData?.role || null;
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserUid(user.uid);
        setUserEmail(user.email ?? "");
        const role = await fetchUserRole(user.uid);
        setUserRole(role);
      } else {
        setUserUid("");
        setUserEmail("");
        setUserRole(null);
      }
      setLoading((prev) => ({ ...prev, onAuthUserChanged: false }));
    });

    return () => unsubscribe();
  }, []);

  const loginWithInternalService = async (email: string, password: string) => {
    setLoading((prev) => ({ ...prev, loginWithInternalService: true }));

    const { error, user } = await signInWithEmailAndPasswordLocal(email, password);

    if (user) {
      successToast("Bem vindo de volta!");
      setUserUid(user.uid);
      setUserEmail(user.email ?? "");
      const role = await fetchUserRole(user.uid);
      setUserRole(role);
    } else {
      setUserUid("");
      setUserEmail("");
      setUserRole(null);
      errorToast(error);
    }

    setLoading((prev) => ({ ...prev, loginWithInternalService: false }));
  };

  const createUserWithInternalService = async ({
    email,
    password,
    name,
    role,
  }: SignUpFormValidationData) => {
    if (!email || !password) {
      errorToast("Email e senha inválidos");
      return;
    }

    setLoading((prev) => ({ ...prev, createUserWithInternalService: true }));

    try {
      const { error, user } = await createUserWithEmailAndPasswordLocal(email, password);

      if (error || !user) {
        errorToast(error || "Erro ao criar usuário");
        return;
      }

      await createNewUserDoc({
        id: user.uid,
        email,
        name,
        role,
      });

      setUserUid(user.uid);
      setUserEmail(user.email ?? "");
      setUserRole(role);

      successToast("Conta criada!");
      router.push("/login");
    } catch (err) {
      errorToast("Erro inesperado ao criar conta");
    } finally {
      setLoading((prev) => ({
        ...prev,
        createUserWithInternalService: false,
      }));
    }
  };

  const waitForUserSync = async () => {
    setLoading((prev) => ({ ...prev, onAuthUserChanged: true }));

    await waitForUser(async (userCred) => {
      if (userCred) {
        setUserUid(userCred.uid);
        setUserEmail(userCred.email ?? "");
        const role = await fetchUserRole(userCred.uid);
        setUserRole(role);
      } else {
        setUserUid("");
        setUserEmail("");
        setUserRole(null);
      }

      setLoading((prev) => ({ ...prev, onAuthUserChanged: false }));
    });
  };

  const logoutUser = async () => {
    setLoading((prev) => ({ ...prev, logout: true }));
    router.push("/login");
    setUserUid("");
    setUserEmail("");
    setUserRole(null);
    await logOut();
    setLoading((prev) => ({ ...prev, logout: false }));
  };

  return (
    <AuthContext.Provider
      value={{
        userUid,
        userEmail,
        userRole,
        loading,
        loginWithInternalService,
        logoutUser,
        setUserUid,
        createUserWithInternalService,
        waitForUserSync,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
