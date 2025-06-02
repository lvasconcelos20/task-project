import { addDoc, collection, getDocs, getFirestore, query, setDoc, where } from "firebase/firestore";

import firebaseApp from '@/source/config/firebase'
import { ProjectEntity } from "@/common/entities/projects";

const db = getFirestore(firebaseApp);
const tableName = "project"

export const createProject = async (data: Omit<ProjectEntity, "id">) => {
    const docRef = await addDoc(collection(db,tableName), {
        ...data,
    })
    return docRef.id
}