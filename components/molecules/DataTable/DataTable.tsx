"use client"

import React, { useState, useMemo } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"

type Column<T> = {
  key: keyof T
  title: string
}

interface DataTableProps<T> {
  title?: string
  createButtonText?: string
  createButtonLink?: string
  onCreateClick?: () => void
  columns: Column<T>[]
  loading?: boolean
  data: T[]
  actions?: (row: T) => React.ReactNode
  pageSize?: number
}

const Table = ({ className, ...props }: React.ComponentProps<"table">) => (
  <div className="relative w-full overflow-x-auto">
    <table className={cn("w-full caption-bottom text-sm", className)} {...props} />
  </div>
)

const TableHeader = ({ className, ...props }: React.ComponentProps<"thead">) => (
  <thead className={cn("[&_tr]:border-b", className)} {...props} />
)

const TableBody = ({ className, ...props }: React.ComponentProps<"tbody">) => (
  <tbody className={cn("[&_tr:last-child]:border-0", className)} {...props} />
)

const TableRow = ({ className, ...props }: React.ComponentProps<"tr">) => (
  <tr className={cn("hover:bg-muted/50 border-b transition-colors", className)} {...props} />
)

const TableHead = ({ className, ...props }: React.ComponentProps<"th">) => (
  <th className={cn("h-10 px-2 text-left font-medium whitespace-nowrap", className)} {...props} />
)

const TableCell = ({ className, ...props }: React.ComponentProps<"td">) => (
  <td className={cn("p-2 align-middle whitespace-nowrap", className)} {...props} />
)

export function DataTable<T extends { id: string }>({
  title = "Lista de Itens",
  createButtonText = "Criar novo",
  createButtonLink = "/create",
  onCreateClick,
  columns,
  data,
  loading = false,
  actions,
  pageSize = 10,
}: DataTableProps<T>) {
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(data.length / pageSize)

  // Dados filtrados para a página atual
  const currentPageData = useMemo(() => {
    const start = (currentPage - 1) * pageSize
    return data.slice(start, start + pageSize)
  }, [currentPage, data, pageSize])

  function handlePrevPage() {
    setCurrentPage((page) => Math.max(page - 1, 1))
  }

  function handleNextPage() {
    setCurrentPage((page) => Math.min(page + 1, totalPages))
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{title}</h1>
        {onCreateClick ? (
          <Button onClick={onCreateClick}>{createButtonText}</Button>
        ) : (
          <Link href={createButtonLink ?? "/create"}>
            <Button>{createButtonText}</Button>
          </Link>
        )}
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((col) => (
              <TableHead key={String(col.key)}>{col.title}</TableHead>
            ))}
            {actions && <TableHead>Ações</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            [...Array(3)].map((_, index) => (
              <TableRow key={`loading-${index}`}>
                {columns.map((_, i) => (
                  <TableCell key={i}>
                    <Skeleton className="h-4 w-full" />
                  </TableCell>
                ))}
                {actions && (
                  <TableCell>
                    <Skeleton className="h-4 w-8" />
                  </TableCell>
                )}
              </TableRow>
            ))
          ) : data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={columns.length + (actions ? 1 : 0)}>
                Nenhum item encontrado.
              </TableCell>
            </TableRow>
          ) : (
            currentPageData.map((row) => (
              <TableRow key={row.id}>
                {columns.map((col) => (
                  <TableCell key={String(col.key)}>{String(row[col.key])}</TableCell>
                ))}
                {actions && <TableCell>{actions(row)}</TableCell>}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {/* Controles de paginação */}
      {data.length > pageSize && (
        <div className="flex justify-between items-center mt-4">
          <Button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            variant="outline"
          >
            Anterior
          </Button>
          <span>
            Página {currentPage} de {totalPages}
          </span>
          <Button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            variant="outline"
          >
            Próxima
          </Button>
        </div>
      )}
    </div>
  )
}
