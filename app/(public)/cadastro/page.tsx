"use client"
import InputField from "@/components/molecules/InputField/inputField";
import Button from "@/components/atoms/Button/button";
import Link from "next/link";
import Image from "next/image";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import SignUpFormSchema from "@/validations/signUp";
import useAuth from "@/source/hooks/useAuth";

type SignUpForm = z.infer<typeof SignUpFormSchema>;

export default function CadastroPage() {
  const { createUserWithInternalService, loading } = useAuth();

  const {
    handleSubmit,
    register,
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
    <div className="w-full h-screen flex flex-col md:flex-row relative overflow-hidden">
      <div className="hidden md:flex w-1/2 h-full bg-gradient-to-b from-[#B1D5FF] via-[#2C8EFD] to-[#004FAA] items-center justify-center relative">
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center text-white text-center px-6">
          <p className="text-4xl font-bold mb-8">A evolução começa com um clique!</p>
          <div className="relative w-[90%] max-w-xl h-[300px]">
            <Image
              src="/pokemons.png"
              alt="pokemons"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>

      <div className="w-full md:w-1/2 h-full relative z-10 bg-white">
        <Image
          src="/background.png"
          alt="Fundo"
          fill
          className="object-cover z-0 opacity-10 md:opacity-100"
        />
        <div className="flex flex-col items-center justify-center relative w-full h-full px-4 py-10">
          <form
            onSubmit={handleSubmit(handleSubmitForm)}
            className="w-full max-w-sm"
          >
            <div className="w-full flex justify-center mb-6">
              <Image src="/logo.png" alt="Logo" width={280} height={150} />
            </div>

            <div className="flex flex-col gap-4">
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
                name="username"
                placeholder="Insira seu nome de usuário"
                label="Nome de usuário"
                type="username"
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
              <Button
                loading={loading?.createUserWithInternalService}
                className="w-full h-10 text-lg bg-gradient-to-b text-white from-[#B1D5FF] via-[#4A709C] to-[#004FAA]"
              >
                Entrar
              </Button>
            </div>
          </form>

          <div className="flex items-center mt-4 text-[#659AD6] text-sm">
            Já possui uma conta?
            <Link href="/login" className="ml-1 text-[#355070] underline">
              Fazer Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
