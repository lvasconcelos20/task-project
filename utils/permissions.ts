
import { ProjectEntity } from "@/common/entities/projects";


/**
 * Verifica se o usuário atual pode editar ou excluir o projeto
 */
export function canManageProject(project: ProjectEntity, currentUserId: string): boolean {
  return project.creator_id === currentUserId;
}

/**
 * Verifica se o usuário pode adicionar ou remover colaboradores
 */

export function canManageCollaborators(project: ProjectEntity, currentUserId: string): boolean {
  return project.creator_id === currentUserId;
}

