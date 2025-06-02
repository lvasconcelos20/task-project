import { addDoc, collection, getDocs, getFirestore, query, setDoc, where } from "firebase/firestore";

import firebaseApp from '@/source/config/firebase'
import { ProjectEntity } from "@/common/entities/projects";

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
    const docRef = await addDoc(collection(db,tableName), {
        ...data,
    })
    return docRef.id
}