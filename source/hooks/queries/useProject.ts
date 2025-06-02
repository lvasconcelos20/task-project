import { useState } from "react";
import { createProjectById, fetchUserProjects } from "@/source/store/services/project";
import { ProjectEntity } from "@/common/entities/projects";
import { useQuery } from "@tanstack/react-query";
import { DocumentData } from "firebase/firestore";



export function getAllProjectsByIdQueryKey(id: string) {
    return["project", id]
}
export function getAllProjectsByIdQueryFn(id: string) {
  return async (): Promise<ProjectEntity[]> => {
    return await fetchUserProjects(id); 
  };
}

export const useProjectAllById = <T = ProjectEntity[]>(
    id: string,
    select?: (data: ProjectEntity[]) => T
) => {

  return useQuery({
    queryKey: getAllProjectsByIdQueryKey(id),
    queryFn: getAllProjectsByIdQueryFn(id),
    select,
    enabled: !!id,
  })
}

export const useCreateProject = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const create = async (project: Omit<ProjectEntity, "id">) => {
    try {
      setLoading(true);
      setError(null);
      const id = await createProjectById(project);
      return id;
    } catch (err: any) {
      setError(err);
      console.error("Erro ao criar projeto:", err);
      return null;
    } finally {
      setLoading(false);
    }
   
  }

  return { create, loading, error };
};
