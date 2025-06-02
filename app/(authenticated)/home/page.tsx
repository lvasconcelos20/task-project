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

export default function Home() {
  const { userUid } = useAuth()
  const { data: projects = [], isLoading } = useProjectAllById(userUid)


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
      createButtonLink="/projects/new"
      loading={isLoading}
      columns={[
        { key: "name", title: "Nome" },
        { key: "description", title: "Descrição" },
        { key: "start_date", title: "Início" },
        { key: "end_date", title: "Fim" },
      ]}
      data={tableData}
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

    </div>
 
  )
}

function formatDate(timestamp: Timestamp | undefined) {
  if (!timestamp) return "-"
  const date = timestamp.toDate()
  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })
}
