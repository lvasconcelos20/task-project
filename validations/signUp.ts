import { z } from "zod";

import email from "@/common/validation/email";
import name from "@/common/validation/name";
import password from "@/common/validation/password";

export default z
  .object({
    name,
    email,
    password,
    role: z.string({message: "Campo Obrigatório"})  
  })
  
