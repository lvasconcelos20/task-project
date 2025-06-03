"use client";
import InputField from "@/components/molecules/InputField/inputField";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import Button from "@/components/atoms/Button/button";
import useAuth from "@/source/hooks/useAuth";
import SignInFormSchema from "@/validations/signIn";

type SignInForm = z.infer<typeof SignInFormSchema>;

export default function LoginPage() {
  const { loginWithInternalService, loading } = useAuth();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<SignInForm>({
    mode: "all",
    criteriaMode: "all",
    resolver: zodResolver(SignInFormSchema),
  });

  const handleSubmitForm = (data: SignInForm) => {
    loginWithInternalService(data.email, data.password);
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="flex flex-col items-center w-full max-w-sm gap-4">
        <form
          onSubmit={handleSubmit(handleSubmitForm)}
          className="w-full flex flex-col items-center gap-4"
        >
          <div className="w-full flex flex-col justify-center gap-6">
          <h1 className="w-full text-center text-3xl font-bold tracking-widest text-black mb-4">
  TASKSHERE - LOGIN
</h1>
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

          </div>
        
          <Button
            loading={loading?.createUserWithInternalService}
            className="w-full h-10 text-lg bg-gradient-to-b text-white from-[#B1D5FF] bg-black"
          >
            Entrar
          </Button>
        </form>

        <div className="text-sm text-gray-600 mt-2">
          Não possui conta?
          <Link href="/register" className="ml-1 text-black underline">
            Cadastre-se
          </Link>
        </div>
      </div>
    </div>
  );
}
