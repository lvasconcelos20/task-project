import { getTasksByProjectQuery } from "@/source/store/services/tasks";
import { useQuery } from "@tanstack/react-query";

export const useTasksByProject = (projectId: string) => {
  return useQuery({
    queryKey: ["tasks", projectId],
    queryFn: getTasksByProjectQuery(projectId),
    enabled: !!projectId
  });
};
