import { useState } from "react";
import { createProjectById, fetchUserProjects, updateProject } from "@/source/store/services/project";
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

export function useUpdateProject() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = async (
    projectId: string,
    data: Parameters<typeof updateProject>[1],
    userId: string
  ) => {
    setLoading(true);
    setError(null);
    try {
      await updateProject(projectId, data, userId);
    } catch (err: any) {
      setError(err.message || "Erro ao atualizar o projeto");
    } finally {
      setLoading(false);
    }
  };

  return {
    update,
    loading,
    error,
  };
}
