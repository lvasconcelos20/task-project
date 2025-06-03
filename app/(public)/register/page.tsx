"use client"
import InputField from "@/components/molecules/InputField/inputField";
import Button from "@/components/atoms/Button/button";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import SignUpFormSchema from "@/validations/signUp";
import useAuth from "@/source/hooks/useAuth";
import SelectField from "@/components/molecules/SelectField/selectField";


type SignUpForm = z.infer<typeof SignUpFormSchema>;

export default function RegisterPage() {
  const { createUserWithInternalService, loading } = useAuth();

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<SignUpForm>({
    mode: "all",
    criteriaMode: "all",
    resolver: zodResolver(SignUpFormSchema),
  });

  const handleSubmitForm = (data: SignUpForm) => {
    createUserWithInternalService(data);
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
 
      <div className="flex flex-col items-center w-full max-w-sm gap-4">
             <h1 className="w-full text-center text-2xl font-bold tracking-widest text-black mb-4">
  TASKSHERE - Cadastro</h1>
        <form
          onSubmit={handleSubmit(handleSubmitForm)}
          className="w-full flex flex-col items-center gap-4"
        >
          <div className="w-full flex flex-col">
              <InputField
            register={register}
            name="name"
            placeholder="Insira seu nome"
            label="Nome"
            type="name"
            formErrors={errors}
          />
          <InputField
            register={register}
            name="email"
            placeholder="Insira seu email"
            label="E-mail"
            type="email"
            formErrors={errors}
          />
          <InputField
            register={register}
            name="password"
            placeholder="Insira sua senha"
            label="Senha"
            type="password"
            formErrors={errors}
          />
          <SelectField
          name="role"
          control={control}
          label="Função"
          options={[
            {value: "manager", label: "Gerente de Projetos"},
            {value: "user", label: "Colaborador"}
          ]}
          formErrors={errors}
          />

          </div>
        
          <Button
            loading={loading?.createUserWithInternalService}
            className="w-full h-10 text-lg bg-gradient-to-b text-white bg-black"
          >
            Entrar
          </Button>
        </form>

        <div className="text-sm text-gray-600 mt-2">
          Já possui uma conta?
          <Link href="/login" className="ml-1 text-black underline">
            Fazer Login
          </Link>
        </div>
      </div>
    </div>
  );
}
