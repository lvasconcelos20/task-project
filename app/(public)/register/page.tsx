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
            className="w-full h-10 text-lg bg-gradient-to-b text-white from-[#B1D5FF] via-[#4A709C] to-[#004FAA]"
          >
            Entrar
          </Button>
        </form>

        <div className="text-sm text-[#659AD6] mt-2">
          Já possui uma conta?
          <Link href="/login" className="ml-1 text-[#355070] underline">
            Fazer Login
          </Link>
        </div>
      </div>
    </div>
  );
}
