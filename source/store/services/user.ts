import { getAuth, User } from "firebase/auth";
import {
    collection,
    doc,
    DocumentData,
    getDoc,
    getDocs,
    getFirestore,
    query,
    setDoc,
  } from "firebase/firestore";


import  firebaseApp  from '@/source/config/firebase'

import { UserEntity } from "@/common/entities/user";
import { userMapper } from "@/utils/userMapper";


const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
const tableName = "users";


  
export const getUserDoc = async (id: string) => {
    if (id === "") return null;
    return new Promise<DocumentData | null>((resolve, reject) => {
      const docRef = doc(db, tableName, id);
  
      getDoc(docRef)
        .then((data) => {
          const userData = data.data();
          resolve(userData || null);
        })
        .catch((error) => reject(error));
    });
  };
  
export const getAllUsers = async () => {
    const usersRef = collection(db, tableName);
    const q = query(usersRef);
    const querySnapshot = await getDocs(q);
    const users: UserEntity[] = [];
    querySnapshot.forEach((doc) => {
      users.push(userMapper({ id: doc.id, ...doc.data() }));
    });
    return users;
  };

export const createNewUserDoc = async ({
    id,
    email,
    name,
    username, 
    password

  }: UserEntity) => {
    try {
      await setDoc(doc(db, tableName, id || ""), {
        name,
        email,
        username,
        password
      });
      return { error: null };
    } catch (error: any) {
      return { error: error.message };
    }
  };

  export const waitForUser = (callback: (user: User | null) => void) => {
    return auth.onAuthStateChanged(callback);
  };
  