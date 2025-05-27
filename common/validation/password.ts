import { z } from "zod";

export default z
  .string({ required_error: "Digite a senha" })
  .min(6, "Deve ter no mínimo 6 caracteres")
  .regex(/^\S+$/g, "Não pode conter espaços em branco")
  .regex(
    /^(?=.*\d)(?=.*[a-zA-Z]).{8,32}$/gm,
    "Deve conter ao menos uma letra e um número"
  );
