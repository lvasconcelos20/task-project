"use client"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import ProjectValidationSchema from "@/validations/project";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { AddProjectModalProps } from "./types"
import InputField from "../InputField/inputField"
import Button from "@/components/atoms/Button/button"
import { useCreateProject } from "@/source/hooks/queries/useProject";
import { ProjectEntity } from "@/common/entities/projects";
import { DatePicker } from "../DatePicker/datePicker";
import { useSuggestedCollaborators } from "@/source/hooks/queries/useCollaborators";
import { useState } from "react";
import { Timestamp } from "firebase/firestore";



type ProjectForm = z.infer<typeof ProjectValidationSchema>;

export function AddProjectModal({ isOpen, setIsOpen, userId }: AddProjectModalProps) {
  const { create, loading} = useCreateProject()
  
  const { collaborators: suggestedCollaborators, loading: loadingSuggestions } = useSuggestedCollaborators(10)
  const [selectedEmails, setSelectedEmails] = useState<string[]>([])

  const {
    handleSubmit,
    register,
    control,
    reset,
    formState: { errors },
  } = useForm<ProjectForm>({
    mode: "all",
    criteriaMode: "all",
    resolver: zodResolver(ProjectValidationSchema),
  });

  const toggleCollaborator = (email: string) => {
    setSelectedEmails((prev) =>
      prev.includes(email) ? prev.filter((e) => e !== email) : [...prev, email]
    )
  }

  const handleSubmitForm = async (data: ProjectForm) => {
    if (!data.start_date || !data.end_date) {
      console.error("🚫 Datas ausentes ou inválidas")
      return
    }

    const formattedData: Omit<ProjectEntity, "id"> = {
      ...data,
      start_date: Timestamp.fromDate(data.start_date),
      end_date: Timestamp.fromDate(data.end_date),
      creator_id: userId,
      collaborators: selectedEmails,
    }
    await create(formattedData)
    setIsOpen(false)
    reset()
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="w-full max-w-md md:max-w-2xl max-h-[90vh] overflow-y-auto p-6">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Criar Projeto</DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(handleSubmitForm, (err) => {
            console.error("Erros no formulário:", err)
          })}
          
          className="grid gap-4 sm:grid-cols-1 md:grid-cols-2"
        >
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
            name="description"
            placeholder="Digite sua descrição"
            label="Descrição"
            type="description"
            formErrors={errors}
          />

          <div className="md:col-span-2 grid gap-4 md:grid-cols-2">
            <Controller
              name="start_date"
              control={control}
              render={({ field }) => (
                <DatePicker
                  label="Data de Início"
                  date={field.value}
                  onDateChange={field.onChange}
                />
              )}
            />
            <Controller
              name="end_date"
              control={control}
              render={({ field }) => (
                <DatePicker
                  label="Data de Término"
                  date={field.value}
                  onDateChange={field.onChange}
                />
              )}
            />
          </div>

          <div className="md:col-span-2 space-y-2">
            <p className="text-sm font-semibold">Sugestões de Colaboradores</p>
            {loadingSuggestions ? (
              <p className="text-sm text-muted-foreground">Carregando sugestões...</p>
            ) : (
              <div className="space-y-2">
                {suggestedCollaborators.map((colab, index) => (
                  <div
                    key={index}
                    onClick={() => toggleCollaborator(colab.email)}
                    className={`flex flex-col border rounded-lg p-3 cursor-pointer transition-all ${
                      selectedEmails.includes(colab.email)
                        ? "bg-blue-100 border-blue-400"
                        : "hover:bg-muted/50"
                    }`}
                  >
                    <p className="font-medium">{colab.name}</p>
                    <p className="text-xs text-muted-foreground">{colab.email}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="md:col-span-2">
            <Button loading={loading} className="w-full mt-2">
              Criar Projeto
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
