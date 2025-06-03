import { collection, query, where, getDocs, addDoc, deleteDoc, updateDoc, doc, getFirestore } from "firebase/firestore";

import firebaseApp from '@/source/config/firebase'
import { TaskEntity } from "@/common/entities/tasks";

const db = getFirestore(firebaseApp);

export const getTasksByProjectQuery = (projectId: string) => async (): Promise<TaskEntity[]> => {
  const tableRef = collection(db, "tasks");
  const q = query(tableRef, where("project_id", "==", projectId));
  const snapshot = await getDocs(q);
  
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as TaskEntity));
};


