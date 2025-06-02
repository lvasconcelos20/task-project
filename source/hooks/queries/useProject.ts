import { useState } from "react";
import { createProjectById, fetchUserProjects } from "@/source/store/services/project";
import { ProjectEntity } from "@/common/entities/projects";
import { useQuery } from "@tanstack/react-query";



export function getAllProjectsByIdQueryKey() {
    return["project"]
}
export function getAllProjectsByIdQueryFn(id:string) {
    return () => fetchUserProjects(id)
}

export const useProjectAllById = (id: string) => {
  return useQuery({
    queryKey: getAllProjectsByIdQueryKey(),
    queryFn: getAllProjectsByIdQueryFn(id),
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
  };

  return { create, loading, error };
};
