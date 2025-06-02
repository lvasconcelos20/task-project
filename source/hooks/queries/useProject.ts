import { useState } from "react";
import { createProject } from "@/source/store/services/project";
import { ProjectEntity } from "@/common/entities/projects";

export const useCreateProject = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const create = async (project: Omit<ProjectEntity, "id">) => {
    try {
      setLoading(true);
      setError(null);
      const id = await createProject(project);
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
