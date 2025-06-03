import { useState } from "react";
import { createProjectById, deleteProject, getAllProjectsByIdQuery, updateProject } from "@/source/store/services/project";
import { ProjectEntity } from "@/common/entities/projects";
import { useQuery } from "@tanstack/react-query";
import { DocumentData } from "firebase/firestore";



export const useProjectsByUser = (userUid: string, userEmail: string) => {
  return useQuery<ProjectEntity[]>({
    queryKey: ["projects", userUid, userEmail],
    queryFn: getAllProjectsByIdQuery(userUid, userEmail),
    enabled: !!userUid && !!userEmail,
    staleTime: 1000 * 60, // 1 minuto
    refetchOnWindowFocus: false,
  });
};

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


export function useDeleteProject() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const remove = async (projectId: string, userId: string) => {
    setLoading(true);
    setError(null);
    try {
      await deleteProject(projectId, userId);
    } catch (err: any) {
      setError(err.message || "Erro ao excluir o projeto");
    } finally {
      setLoading(false);
    }
  };

  return {
    remove,
    loading,
    error,
  };
}
