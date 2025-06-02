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
import { UpdateProjectModalProps } from "./types"
import InputField from "../InputField/inputField"
import Button from "@/components/atoms/Button/button"
import { useUpdateProject } from "@/source/hooks/queries/useProject";
import { Timestamp } from "firebase/firestore";
import { ProjectEntity } from "@/common/entities/projects";
import { DatePicker } from "../DatePicker/datePicker";
import { useSuggestedCollaborators } from "@/source/hooks/queries/useCollaborators";
import { useEffect, useState } from "react";


type ProjectForm = z.infer<typeof ProjectValidationSchema>;

export function UpdateProjectModal({
  isOpen,
  setIsOpen,
  userId,
  projectToEdit,
}: UpdateProjectModalProps) {
  const { update, loading } = useUpdateProject();
  const { collaborators: suggestedCollaborators, loading: loadingSuggestions } = useSuggestedCollaborators(10);
  const [selectedEmails, setSelectedEmails] = useState<string[]>([]);

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

  useEffect(() => {
    if (
      projectToEdit &&
      projectToEdit.start_date instanceof Timestamp &&
      projectToEdit.end_date instanceof Timestamp
    ) {
      const start = projectToEdit.start_date.toDate();
      const end = projectToEdit.end_date.toDate();

      console.log("✅ Reset com datas válidas:", { start, end });

      reset({
        name: projectToEdit.name,
        description: projectToEdit.description,
        start_date: start,
        end_date: end,
      });

      setSelectedEmails(projectToEdit.collaborators || []);
    } else {
      console.warn("⚠️ projectToEdit incompleto ou datas inválidas", projectToEdit);
    }
}, [projectToEdit, reset]);

  const toggleCollaborator = (email: string) => {
    setSelectedEmails((prev) =>
      prev.includes(email) ? prev.filter((e) => e !== email) : [...prev, email]
    );
  };

  const handleSubmitForm = async (data: ProjectForm) => {
    if (!data.start_date || !data.end_date || !projectToEdit) {
      console.error("🚫 Dados inválidos ou projeto não encontrado");
      return;
    }

    const formattedData: Partial<Omit<ProjectEntity, "id" | "creator_id">> = {
      ...data,
      start_date: Timestamp.fromDate(data.start_date),
      end_date: Timestamp.fromDate(data.end_date),
      collaborators: selectedEmails,
    };


    await update(projectToEdit.id, formattedData, userId);
    setIsOpen(false);
    reset();
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="w-full max-w-md md:max-w-2xl max-h-[90vh] overflow-y-auto p-6">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Editar Projeto</DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(handleSubmitForm, (err) => {
            console.error("Erros no formulário:", err);
          })}
          className="grid gap-4 sm:grid-cols-1 md:grid-cols-2"
        >
          <InputField
            register={register}
            name="name"
            placeholder="Insira o nome do projeto"
            label="Nome"
            type="name"
            formErrors={errors}
          />
          <InputField
            register={register}
            name="description"
            placeholder="Digite a descrição"
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
                  onDateChange={(date) => {
                    console.log("📅 Data de Início selecionada:", date);
                    field.onChange(date);
                  }}
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
                  onDateChange={(date) => {
                    console.log("📅 Data de Término selecionada:", date);
                    field.onChange(date);
                  }}
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
              Editar Projeto
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
