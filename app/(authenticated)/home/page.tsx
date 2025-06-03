"use client";

import { useState } from "react";
import { MoreHorizontal } from "lucide-react";

import { DataTable } from "@/components/molecules/DataTable/DataTable";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { AddProjectModal } from "@/components/molecules/AddProjectModal/addProjectModal";
import { UpdateProjectModal } from "@/components/molecules/UpdateProjectModal/updateProjectModal";

import { useProjectsByUser, useDeleteProject } from "@/source/hooks/queries/useProject";
import useAuth from "@/source/hooks/useAuth";
import { usePermissions } from "@/source/hooks/queries/usePermissions";

import { ProjectEntity } from "@/common/entities/projects";

export default function Home() {
  const { userUid, userEmail  } = useAuth();
  const { data: projects = [], isLoading } = useProjectsByUser(userUid, userEmail);
  const { remove, loading: deletingProject } = useDeleteProject();
console.log("userUid:", userUid);
console.log("userEmail:", userEmail);
  const [openAddProjectModal, setIsOpenAddProjectModal] = useState(false);
  const [openEditProjectModal, setIsOpenEditProjectModal] = useState(false);
  const [projectToEdit, setProjectToEdit] = useState<ProjectEntity>();


  const { canManageProject } = usePermissions();

  const handleEdit = (project: ProjectEntity) => {
    setProjectToEdit(project);
    setIsOpenEditProjectModal(true);
  };

  const handleDelete = async (projectId: string) => {
    if (!userUid) return;
    try {
      await remove(projectId, userUid);
    } catch (error) {
   
    }
  };

  const tableData = projects.map((project) => ({
    ...project,
    start_date: formatDate(project.start_date),
    end_date: formatDate(project.end_date),
  }));

  return (
    <div className="w-full h-screen p-20">
      <DataTable
        title="Dashboard"
        createButtonText="Criar novo projeto"
        onCreateClick={() => setIsOpenAddProjectModal(true)}
        loading={isLoading}
        columns={[
          { key: "name", title: "Nome" },
          { key: "description", title: "Descrição" },
          { key: "start_date", title: "Início" },
          { key: "end_date", title: "Fim" },
        ]}
        data={tableData}
        pageSize={5}
        actions={(row) => {
          const originalProject = projects.find((p) => p.id === row.id);
          const isOwner = originalProject ? canManageProject(originalProject) : false;

          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {isOwner && (
                  <DropdownMenuItem onClick={() => handleEdit(originalProject!)}>
                    Editar
                  </DropdownMenuItem>
                )}
                {isOwner && (
                  <DropdownMenuItem onClick={() => handleDelete(row.id)}>
                    {deletingProject ? "Excluindo..." : "Excluir"}
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          );
        }}
      />

      <AddProjectModal
        isOpen={openAddProjectModal}
        setIsOpen={setIsOpenAddProjectModal}
        userId={userUid}
      />

      {projectToEdit && (
        <UpdateProjectModal
          isOpen={openEditProjectModal}
          setIsOpen={setIsOpenEditProjectModal}
          userId={userUid}
          projectToEdit={projectToEdit}
        />
      )}
    </div>
  );
}


function formatDate(dateValue: any) {
  if (!dateValue) return "-";

  if (typeof dateValue.toDate === "function") {
    return dateValue.toDate().toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  }

  const date = new Date(dateValue);
  if (isNaN(date.getTime())) return "-";

  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}
