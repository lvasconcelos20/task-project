import { z } from "zod";

export const TaskSchema = z.object({
  title: z.string().min(3, "O título deve ter no mínimo 3 caracteres."),
  
  status: z.enum(["todo", "in_progress", "done"], {
    required_error: "O status é obrigatório."
  }),
  
  due_date: z.coerce.date().refine(
    (date) => date > new Date(), 
    { message: "A data deve ser futura." }
  ),
  
  image_url: z.string().url("URL da imagem inválida."),
  
  project_id: z.string().min(1, "ID do projeto é obrigatório."),
  
  creator_id: z.string().min(1, "ID do criador é obrigatório."),
});
