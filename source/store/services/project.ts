import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, getFirestore, query, QueryFieldFilterConstraint, setDoc, updateDoc, where } from "firebase/firestore";

import firebaseApp from '@/source/config/firebase'
import { ProjectEntity } from "@/common/entities/projects";
import { errorToast, successToast } from "@/source/hooks/useAppToast";


const db = getFirestore(firebaseApp);
const tableName = "project"

export const getAllProjectsByIdQuery = (userUid: string, userEmail: string) => async (): Promise<ProjectEntity[]> => {

  const tableRef = collection(db, tableName);
  const q1 = query(tableRef, where("creator_id", "==", userUid));
  const q2 = query(tableRef, where("collaborators", "array-contains", userEmail));

  const [snapshot1, snapshot2] = await Promise.all([getDocs(q1), getDocs(q2)]);

  const projectsMap = new Map<string, ProjectEntity>();

   snapshot1.forEach((doc) => {
        const data = doc.data();
        projectsMap.set(doc.id, { id: doc.id, ...data } as ProjectEntity);
      });

      snapshot2.forEach((doc) => {
        const data = doc.data();
        projectsMap.set(doc.id, { id: doc.id, ...data } as ProjectEntity);
      });

      return Array.from(projectsMap.values());

};

export const createProjectById = async (data: Omit<ProjectEntity, "id">) => {
  try {
    const docRef = await addDoc(collection(db, tableName), {
      ...data,
    });
    successToast("Projeto criado com sucesso!");
    return docRef.id;
  } catch (error) {
    errorToast("Erro ao criar projeto. Tente novamente.");
    throw error;
  }
};


export async function updateProject(
  projectId: string,
  data: Partial<Omit<ProjectEntity, "id" | "creator_id">>,
  userId: string
): Promise<void> {
  try {
    const projectRef = doc(db, tableName, projectId);
    const projectSnap = await getDoc(projectRef);

    if (!projectSnap.exists()) {
      errorToast("Projeto não encontrado.");
      throw new Error("Projeto não encontrado");

    }

    const projectData = projectSnap.data() as ProjectEntity;

    if (projectData.creator_id !== userId) {
      errorToast("Você não tem permissão para editar este projeto.");
      throw new Error("Usuário não autorizado");
    }

    await updateDoc(projectRef, {
      ...data,
    });

    successToast("Projeto atualizado com sucesso!");
  } catch (error: any) {
    errorToast(error.message || "Erro ao atualizar o projeto.");
    throw error;
  }
}

export async function deleteProject(projectId: string, userId: string): Promise<void> {
  try {
    const projectRef = doc(db, tableName, projectId);
    const projectSnap = await getDoc(projectRef);

    if (!projectSnap.exists()) {
      errorToast("Projeto não encontrado.");
      throw new Error("Projeto não encontrado");
    }

    const projectData = projectSnap.data() as ProjectEntity;

    if (projectData.creator_id !== userId) {
      errorToast("Você não tem permissão para excluir este projeto.");
      throw new Error("Usuário não autorizado");
    }

    await deleteDoc(projectRef);
    successToast("Projeto excluído com sucesso!");
  } catch (error: any) {
    errorToast(error.message || "Erro ao excluir o projeto.");
    throw error;
  }
}

function or(arg0: QueryFieldFilterConstraint, arg1: QueryFieldFilterConstraint): import("@firebase/firestore").QueryCompositeFilterConstraint {
  throw new Error("Function not implemented.");
}


function projectMapper(arg0: any): ProjectEntity {
  throw new Error("Function not implemented.");
}
