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
          <div className="w-full flex flex-col">
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
            className="w-full h-10 text-lg bg-gradient-to-b text-white from-[#B1D5FF] via-[#4A709C] to-[#004FAA]"
          >
            Entrar
          </Button>
        </form>

        <div className="text-sm text-[#659AD6] mt-2">
          Não possui conta?
          <Link href="/register" className="ml-1 text-[#355070] underline">
            Cadastre-se
          </Link>
        </div>
      </div>
    </div>
  );
}
