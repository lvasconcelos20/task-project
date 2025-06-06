import { z } from "zod";


const  ProjectValidationSchema = z
  .object({
    name: z.string({message: "Campo Obrigatório"}).min(3,"Escreva pelo menos 3 caracteres."), 
    description: z.string().max(500,"Limite de caracteres atingido.").optional(),
    start_date: z.coerce.date({
        required_error: "Data de início é obrigatória",
        invalid_type_error: "Data de início inválida",
    }),
    end_date: z.coerce.date({
        required_error: "Data de término é obrigatória",
        invalid_type_error: "Data de término inválida",
    }),
    collaborators: z.array(z.string()).optional(),
    creator_id: z.string().optional(),

    })
    .refine((data) => data.end_date > data.start_date, {
    message: "A data de término deve ser posterior à data de início",
    path: ["end_date"],
    })
   
  
export default ProjectValidationSchema;