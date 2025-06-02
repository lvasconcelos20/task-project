import { addDoc, collection, doc, getDoc, getDocs, getFirestore, query, setDoc, updateDoc, where } from "firebase/firestore";

import firebaseApp from '@/source/config/firebase'
import { ProjectEntity } from "@/common/entities/projects";
import { errorToast, successToast } from "@/source/hooks/useAppToast";

const db = getFirestore(firebaseApp);
const tableName = "project"


export async function fetchUserProjects(userId: string): Promise<ProjectEntity[]> {
  const snapshot = await getDocs(collection(db, tableName))
  const projects: ProjectEntity[] = []

  snapshot.forEach((doc) => {
    const data = doc.data() as ProjectEntity
    const isCreator = data.creator_id === userId
    const isCollaborator = data.collaborators.includes(userId)

    if (isCreator || isCollaborator) {
      projects.push({ ...data, id: doc.id })
    }
  })

  return projects
}
export const createProjectById = async (data: Omit<ProjectEntity, "id">) => {
  try {
    const docRef = await addDoc(collection(db, tableName), {
      ...data,
    });
    return docRef.id;
  } catch (error) {

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