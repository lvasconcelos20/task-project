"use client"

import { DataTable } from "@/components/molecules/DataTable/DataTable"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"
import { useProjectAllById } from "@/source/hooks/queries/useProject"
import { Timestamp } from "firebase/firestore"
import useAuth from "@/source/hooks/useAuth"
import { AddProjectModal } from "@/components/molecules/AddProjectModal/addProjectModal"
import { useState } from "react"


export default function Home() {
  const { userUid } = useAuth()
  const { data: projects = [], isLoading } = useProjectAllById(userUid)
  const [openAddProjectModal, setIsOpenAddProjectModal] = useState(false)


  const tableData = projects.map((project) => ({
    ...project,
    start_date: formatDate(project.start_date),
    end_date: formatDate(project.end_date),
  })) 

  return (
    <div className="w-full h-screen p-20">
         <DataTable
            title="Dashboard"
            createButtonText="Criar novo projeto"
            onCreateClick={()=> setIsOpenAddProjectModal(true)}
            loading={isLoading}
            columns={[
              { key: "name", title: "Nome" },
              { key: "description", title: "Descrição" },
              { key: "start_date", title: "Início" },
              { key: "end_date", title: "Fim" },
            ]}
            data={tableData}
            pageSize={5}
            actions={(row) => (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => alert(`Editar ${row.name}`)}>Editar</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => alert(`Excluir ${row.name}`)}>Excluir</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
    />
    <AddProjectModal
      isOpen={openAddProjectModal}
      setIsOpen={setIsOpenAddProjectModal}
      userId={userUid}
    />

    </div>
 
  )
}
function formatDate(dateValue: any) {
  if (!dateValue) return "-"
  
  if (typeof dateValue.toDate === "function") {
    return dateValue.toDate().toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
  }
  
  // Se for string ou Date nativo
  const date = new Date(dateValue)
  if (isNaN(date.getTime())) return "-"
  
  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })
}