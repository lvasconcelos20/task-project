"use client"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { TaskSchema } from "@/validations/tasks";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { AddTaskModalProps } from "./type";
import InputField from "../InputField/inputField"
import Button from "@/components/atoms/Button/button"
import { useCreateTask } from "@/source/hooks/queries/useTasks";
import { TaskEntity } from "@/common/entities/tasks";
import { DatePicker } from "../DatePicker/datePicker";
import useAuth from "@/source/hooks/useAuth";


type TaskForm = z.infer<typeof TaskSchema>;

export function AddTaskModal({ isOpen, setIsOpen, projectId }: AddTaskModalProps) {
  const { create    } = useCreateTask();
  const { userUid } = useAuth();

  const {
    handleSubmit,
    register,
    control,
    reset,
    formState: { errors },
  } = useForm<TaskForm>({
    mode: "all",
    criteriaMode: "all",
    resolver: zodResolver(TaskSchema),
    defaultValues: {
      project_id: projectId,
      creator_id: userUid
    }
  });

  const handleSubmitForm = async (data: TaskForm) => {
    const formattedData: Omit<TaskEntity, "id"> = {
      ...data,
      due_date: data.due_date,
    }
    await create(formattedData);
    setIsOpen(false);
    reset();
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="w-full max-w-md md:max-w-2xl max-h-[90vh] overflow-y-auto p-6">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Criar Tarefa</DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(handleSubmitForm, (err) => {
            console.error("Erros no formulário:", err)
          })}
          className="grid gap-4 sm:grid-cols-1"
        >
          <InputField
            register={register}
            name="title"
            placeholder="Título da tarefa"
            label="Título"
            formErrors={errors}
          />

          <InputField
            register={register}
            name="image_url"
            placeholder="https://exemplo.com/imagem.png"
            label="URL da Imagem"
            formErrors={errors}
          />

          <Controller
            name="due_date"
            control={control}
            render={({ field }) => (
              <DatePicker
                label="Data de Entrega"
                date={field.value}
                onDateChange={field.onChange}
              />
            )}
          />

          <div>
            <label className="block text-sm font-medium">Status</label>
            <select
              {...register("status")}
              className="w-full border rounded p-2 mt-1"
            >
              <option value="todo">A Fazer</option>
              <option value="in_progress">Em Progresso</option>
              <option value="done">Concluída</option>
            </select>
            {errors.status && (
              <p className="text-red-500 text-xs">{errors.status.message}</p>
            )}
          </div>


          <input type="hidden" {...register("project_id")} value={projectId} />
          <input type="hidden" {...register("creator_id")} value={userUid} />

          <div>
            <Button  className="w-full mt-2">
              Criar Tarefa
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
