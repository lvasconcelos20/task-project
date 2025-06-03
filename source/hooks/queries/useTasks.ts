import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getTasksByProjectQuery, createTaskById} from "@/source/store/services/tasks";
import { TaskEntity } from "@/common/entities/tasks";
import { useState } from "react";

export const useTasksByProject = (userUid: string, projectId: string) => {
  return useQuery<TaskEntity[]>({
    queryKey: ["tasks", userUid, projectId],
    queryFn: getTasksByProjectQuery(userUid, projectId),
    enabled: !!projectId
  });
};

export const useCreateTask = () => {
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState<Error | null>(null);

    const create = async (task: Omit<TaskEntity, "id">) => {
       try {
         setLoading(true);
         setError(null);
         const id = await createTaskById(task);
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
   
   
