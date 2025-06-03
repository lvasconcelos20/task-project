"use client";

import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import useAuth from "@/source/hooks/useAuth";
import { usePermissions } from "@/source/hooks/queries/usePermissions";
import { DataTable } from "@/components/molecules/DataTable/DataTable";
import { useProjectsByUser } from "@/source/hooks/queries/useProject";
import { useTasksByProject } from "@/source/hooks/queries/useTasks";
import { AddTaskModal } from "@/components/molecules/AddTaskModal/addTaskModal";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";

export default function ProjectDetail() {
  const router = useRouter();
  const { taskId } = useParams();
  const { userUid, userEmail } = useAuth();
  const [openAddTaskModal, setIsOpenAddTaskModal] = useState(false);
  const { data: projects = [], isLoading: projectLoading } = useProjectsByUser(userUid, userEmail);
  const project = projects.find((p) => p.id === taskId);

  const { data: tasks = [], isLoading: tasksLoading } = useTasksByProject(userUid as string, taskId as string); 
  const { canManageProject } = usePermissions();

  const isOwner = project ? canManageProject(project) : false;

  const formattedTasks = tasks.map((task) => ({
    ...task,
    render: (row: { image_url: string }) => (
      <img
        src={row.image_url}
        alt="Imagem"
        className="w-12 h-12 object-cover rounded"
      />
    ),
  }));

  return (
    <div className="w-full  h-screen p-10 md:p-10 space-y-8">


      <Button
        variant="ghost"
        className="flex items-center pt-20"
        onClick={() => router.back()}
      >
        <ArrowLeft className="w-4 h-4" />
        Voltar
      </Button>

      {projectLoading && <div>Carregando projeto...</div>}
      {!project && !projectLoading && <div>Projeto não encontrado.</div>}

      {project && (
        <>
          <div className="space-y-1">
            <h1 className="text-4xl font-extrabold">{project.name}</h1>
            <p className="text-muted-foreground">{project.description}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm text-muted-foreground">Data de Início</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-medium">{formatDate(project.start_date)}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm text-muted-foreground">Data de Fim</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-medium">{formatDate(project.end_date)}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm text-muted-foreground">Colaboradores</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1 text-sm">
                  {(project.collaborators || []).map((email: string) => (
                    <li key={email} className="text-muted-foreground">
                      • {email}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <DataTable
              title="Tarefas"
              createButtonText="Nova Tarefa"
              onCreateClick={() => setIsOpenAddTaskModal(true)}
              loading={tasksLoading}
              columns={[
                { key: "title", title: "Título" },
                { key: "status", title: "Status" },
                { key: "image_url", title: "Imagem" },
              ]}
              data={formattedTasks}
              pageSize={5}
              actions={(row) => {
                const canEditTask = isOwner || row.creator_id === userUid;

                return (
                  <>
                    {canEditTask && (
                      <Button variant="ghost" size="sm">
                        Editar
                      </Button>
                    )}
                    {canEditTask && (
                      <Button variant="ghost" size="sm">
                        Excluir
                      </Button>
                    )}
                  </>
                );
              }}
            />
          </div>

        </>
      )}

      <AddTaskModal
        isOpen={openAddTaskModal}
        setIsOpen={setIsOpenAddTaskModal}
        projectId={userUid}
      />
    </div>
  );
}

function formatDate(dateValue: any) {
  if (!dateValue) return "-";
  if (typeof dateValue.toDate === "function") {
    return dateValue.toDate().toLocaleDateString("pt-BR");
  }
  const date = new Date(dateValue);
  return isNaN(date.getTime()) ? "-" : date.toLocaleDateString("pt-BR");
}
