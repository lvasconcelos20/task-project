import { collection, query, where, getDocs, addDoc, deleteDoc, updateDoc, doc, getFirestore } from "firebase/firestore";

import firebaseApp from '@/source/config/firebase'
import { TaskEntity } from "@/common/entities/tasks";
import { errorToast, successToast } from "@/source/hooks/useAppToast";

const db = getFirestore(firebaseApp);

const tableName = "task"

export const getTasksByProjectQuery = (userUid: String, projectId: string) => async (): Promise<TaskEntity[]> => {
  const tableRef = collection(db, tableName);
  const q1 = query(tableRef, where("creator_id", "==", userUid));
  const q2 = query(tableRef, where("project_id", "==", projectId ));

  const [snapshot1, snapshot2] = await Promise.all([getDocs(q1), getDocs(q2)]);
const projectsMap = new Map<string, TaskEntity>();

   snapshot1.forEach((doc) => {
        const data = doc.data();
        projectsMap.set(doc.id, { id: doc.id, ...data } as TaskEntity);
      });

      snapshot2.forEach((doc) => {
        const data = doc.data();
        projectsMap.set(doc.id, { id: doc.id, ...data } as TaskEntity);
      });

      return Array.from(projectsMap.values());

  
};


export const createTaskById = async (data: Omit<TaskEntity, "id">) => {
  try {
    const docRef = await addDoc(collection(db, tableName), {
      ...data,
    });
    successToast("Tarefa criada com sucesso!");
    return docRef.id;
  } catch (error) {
    errorToast("Erro ao criar a tarefa. Tente novamente.");
    throw error;
  }
};

